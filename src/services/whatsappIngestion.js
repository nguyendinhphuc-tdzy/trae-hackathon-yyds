const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const loggedGroupChatIds = new Set();

function safeToString(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return String(value);
}

function logEvent(type, payload) {
  try {
    const line = payload ? `${type} ${JSON.stringify(payload)}` : type;
    console.log(line);
  } catch {
    console.log(type);
  }
}

async function resolveSenderName(message) {
  try {
    const contact = await message.getContact();
    return (
      safeToString(contact?.pushname).trim() ||
      safeToString(contact?.name).trim() ||
      safeToString(contact?.number).trim()
    );
  } catch {
    return (
      safeToString(message?._data?.notifyName).trim() ||
      safeToString(message?._data?.sender?.pushname).trim()
    );
  }
}

async function fetchChatTranscript(message, options = {}) {
  const limit = options.limit || 20;
  const chat = await message.getChat();
  const fetched = await chat.fetchMessages({ limit });
  const messages = Array.isArray(fetched) ? fetched : [];

  messages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

  const lines = [];
  for (const msg of messages) {
    const body = safeToString(msg?.body).trim();
    if (!body) continue;
    const sender = msg?.fromMe ? "Me" : await resolveSenderName(msg);
    lines.push(`${sender}: ${body}`);
  }
  return lines.join("\n");
}

async function normalizeMessage(message) {
  const messageId = safeToString(message?.id?._serialized).trim();
  const chatId = safeToString(message?.from).trim();
  const text = safeToString(message?.body).trim();
  const senderName = (await resolveSenderName(message)) || "";

  if (!messageId || !chatId) return null;
  return { messageId, chatId, text, senderName };
}

function startWhatsAppIngestion(options) {
  const authPath = safeToString(options?.authPath || process.env.WA_AUTH_PATH).trim();
  const isVipClient = options?.isVipClient;
  const shouldContinueForMessageId = options?.shouldContinueForMessageId;
  const onEvent = options?.onEvent;

  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: authPath }),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });

  client.on("qr", (qr) => {
    logEvent("whatsapp.qr", { needsAuth: true });
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => logEvent("whatsapp.ready"));

  client.on("message", async (message) => {
    if (message.fromMe) return;

    try {
      const chat = await message.getChat();
      const chatId = safeToString(message?.from).trim();
      if (chat.isGroup && !loggedGroupChatIds.has(chatId)) {
        loggedGroupChatIds.add(chatId);
        logEvent("whatsapp.group_chat_detected", { chatId, name: chat.name });
      }

      const event = await normalizeMessage(message);
      if (!event || !event.text) return;

      // Check VIP
      const isVip = await isVipClient(event.chatId);
      if (!isVip) return;

      // Idempotency
      const shouldContinue = await shouldContinueForMessageId(event.messageId);
      if (!shouldContinue) return;

      // Get Transcript
      event.chatTranscript = await fetchChatTranscript(message, { limit: options.transcriptLimit });

      // Process Event
      await onEvent(event);
    } catch (error) {
      logEvent("whatsapp.processing_error", { message: error.message });
    }
  });

  client.initialize();
  return { client };
}

module.exports = { startWhatsAppIngestion };

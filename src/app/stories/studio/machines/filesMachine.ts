import { assign, fromPromise, sendParent, setup } from "xstate"


export const filesMachine = setup({
  actors: {
    loader: fromPromise(async () => loadDocuments()),
  },
  actions: {
  },
}).createMachine({
  id: "files",
  context: { documents: [], error: null },
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: "loader",
        onDone: {
          target: "ready",
          actions: [
            assign({ documents: ({ event }) => event.output, error: null }),
            sendParent(({ event }) => {
              return { type: "files.loaded" as const, documents: event.output }
            }),
          ],
        },
        onError: {
          target: "ready",
        },
      },
    },
    ready: {
      on: {
        "sys.retry": { target: "loading" },
      },
    },
  },
});



export async function loadDocuments() {
  return [
    {
      "id": "ac317797-28a8-46a7-a937-aa2916d69b25",
      "name": "untitled-3.md",
      "content": "# untitled-3\n",
      "sessionId": "bcef9fe3-1e8b-4bfd-9b62-6708d2c1761c",
      "updatedAt": "2026-10-27T12:36:53.969Z"
    },
    {
      "id": "3f652a71-43c7-4b8e-9591-f58f9b2d017d",
      "name": "untitled-2.md",
      "content": "# untitled-2\n",
      "sessionId": "ab4aca3a-e29c-4c92-b253-10f3a3190113",
      "updatedAt": "2026-10-27T12:36:52.530Z"
    },
    {
      "id": "c5609bc0-1545-4d9b-82ae-7f141330877e",
      "name": "untitled.md",
      "content": "# untitled\n",
      "sessionId": "e4819ea3-3d42-4175-a2cd-b692332ff706",
      "updatedAt": "2026-10-27T12:36:50.185Z"
    },
    {
      "id": "4fd85f79-51bb-41ef-ba22-c94b8477f564",
      "name": "readme.md",
      "content": "# Design Studio\n\nDesign Studio is a small web application for writing software design\ndocuments: Markdown with [Mermaid](https://mermaid.js.org) diagrams,\nrendered live, and an assistant sitting beside them. You describe a\nsystem, the assistant draws the diagram, you ask for changes and it edits\nthe document in place. When Mermaid rejects a diagram it wrote, it reads\nthe parse error and fixes it.\n\nIt exists to demonstrate\n[assistant-runtime](https://pypi.org/project/assistant-runtime/), an\nassistant backend that an application puts behind its own interface. The\nruntime owns the conversation, calls the model and streams the result.\nThe application describes what is on screen and performs the actions the\nmodel asks for. Design Studio is a complete, deliberately small example\nof the application half of that arrangement: one screen, no accounts, and\ndocuments stored in your browser. The Next.js app and the runtime run as\nseparate local processes.\n\n![The studio: the document list, the Markdown and Mermaid preview, and the assistant panel](public/screenshot.png)\n\n## Run locally\n\nYou need Git, [Bun](https://bun.sh), [uv](https://docs.astral.sh/uv/)\nfor installing the Python runtime (Python 3.12 or newer), and `make`.\nThe example below uses an Anthropic API key with credit for text chat.\nOther providers are supported; see `assistant-runtime docs configuration` after installation.\n\n### 1. Get the app\n\n```bash\ngit clone https://github.com/eandualem/design-studio\ncd design-studio\nbun install\n```\n\n### 2. Start the runtime\n\nIn that same terminal, from the `design-studio` directory:\n\n```bash\nuv tool install 'assistant-runtime[voice]==0.2.0'\nexport ANTHROPIC_API_KEY='replace-with-your-key'\nexport ASSISTANT__PROFILES=\"[\\\"$PWD/profiles/design-studio.toml\\\"]\"\nassistant-runtime serve --port 7100\n```\n\nThe profile registers this app's assistant instructions and diagram style\nguide under the name `design_studio`. Its path must be absolute; the command\nabove expands it from the checkout. Keep this terminal running. The runtime\nalso reads a `.env` file in the directory from which it starts. Shell commands\nand `.env` files use different syntax: if you use `.env`, do not include\n`export` or `$PWD`; write the key and an absolute profile path instead:\n\n```dotenv\nANTHROPIC_API_KEY=your-real-anthropic-key\nASSISTANT__PROFILES=[\"/absolute/path/to/design-studio/profiles/design-studio.toml\"]\n```\n\nThis recipe pins assistant-runtime 0.2.0, the minimum version for the\nprofile registration and per-call voice instructions used here. The runtime's\nown setup and configuration references ship with the package:\n\n```bash\nassistant-runtime docs\nassistant-runtime docs configuration\nassistant-runtime docs host-contract\n```\n\n### 3. Start the studio and create a document\n\nOpen a second terminal in the same `design-studio` checkout and run:\n\n```bash\nmake dev\n```\n\n`make dev` checks that the runtime is reachable and has the `design_studio`\nprofile registered, then starts the app on port 7130. It also checks runtime\nhealth; a missing LLM provider is a warning so you can inspect the interface,\nbut assistant requests will fail until you configure a provider key. Other\nhealth failures stop startup. `bun run dev` starts the app directly and skips\nthose checks. Neither command starts or stops the runtime. Voice can be\ndisabled while text chat works.\n\nOpen <http://localhost:7130> and send:\n\n> Design a payment service with an API, a worker, Postgres and a queue.\n\nThe assistant should create a document in the sidebar and render a diagram\nin **Preview**. Then ask: *“Make the diagram left to right and add a\ndead-letter queue.”* The existing document should update. Use **Source**\nto inspect or edit its Markdown.\n\n### Connection and saved data\n\nThe studio connects to `http://127.0.0.1:7100`. To use another runtime,\nset `NEXT_PUBLIC_RUNTIME_URL` in the app terminal before starting it:\n\n```bash\nNEXT_PUBLIC_RUNTIME_URL=http://127.0.0.1:7102 make dev\n```\n\nDocuments are stored in IndexedDB, the browser's local database. They survive\npage reloads and runtime restarts, but are specific to that browser and site\naddress; clearing site data removes them. Conversations are stored separately\nby the runtime. Without its optional Postgres configuration, they are lost on\nruntime restart even though the documents remain. For durable conversations,\nfollow `assistant-runtime docs persistence`, configure the database and run\n`assistant-runtime migrate` before starting the runtime. Runtime session\nretention still applies; Postgres is not an indefinite conversation archive.\n\n### Talk through a design\n\nFor voice, add these variables in the runtime terminal before starting\n`assistant-runtime serve` (restart it if already running):\n\n```bash\nexport VOICE__ENABLED=true\nexport OPENAI_API_KEY='replace-with-your-openai-key'\n```\n\nKeep the text/design provider key and profile registration from the setup\nabove. Voice uses OpenAI independently of the model that edits the document.\nUse a browser with microphone access and WebRTC (browser audio streaming)\nsupport on localhost or HTTPS. The OpenAI key needs access to GPT-Live.\nLive calls incur provider charges; use **End the call** when finished.\n\nPress **Talk live**, allow microphone access, and describe a system. The\n**Design model** control in the header selects the model for document edits;\nits provider must be available in the runtime. **Mute** silences your microphone;\n**Stop** stops the controller's current decision; **End the call** closes voice.\nSee [the voice guide](docs/voice.md) for the control behavior and architecture.\n\n## Using it\n\nThe centre pane has a **Source** tab you can type in and a **Preview** tab\nthat renders it. A document is split into blocks, headings and paragraphs\nas text and fenced `mermaid` code blocks as diagrams; the assistant edits\none block at a time. Click a block in the preview to select it, and the\nassistant is told what you selected.\n\nThe right pane is the assistant. Each document carries its own\nconversation, so switching documents switches the chat. The book icon in\nits header opens the assistant's artifacts, where a proposed style-guide\nchange waits for approval.\n\n## What it demonstrates\n\n- **Host context.** The app tells the model what is on screen: the open\n  document, its blocks with a one-line summary each, which block is\n  selected, and whether every diagram rendered.\n- **Host actions.** The model requests edits for the app to perform. It calls\n  six actions the app declares (`create_document`, `open_document`,\n  `replace_block`, `insert_block`, `delete_block`, `rename_document`); the\n  app performs them and hands back the result, including the Mermaid\n  render outcome. A parse error is a successful action with a failed\n  render, which is what lets the assistant repair its own diagram.\n- **Streaming, steering and cancellation.** Thinking, text and tool calls\n  arrive as they happen. A message sent while the assistant is working\n  becomes a mid-turn nudge; stopping a turn keeps the partial answer.\n- **Branching.** \"Try a variant\" sends a different message from an earlier\n  point in the conversation; a switcher moves between the branches, which\n  the runtime keeps as a tree.\n- **Attachments.** Drop an image into the chat and the assistant sees it.\n  When a preview screenshot is available, it travels with the message, and\n  the assistant looks at it only when it decides to.\n- **Prompt artifacts.** These are the assistant's instructions, visible in\n  the panel. One of them, the diagram style guide, is one the assistant\n  may propose changes to: say \"always put a legend in architecture\n  diagrams\" and it proposes a new version, which waits for your approval.\n- **Cost.** Tokens and cost per message, and a running total for the\n  session.\n- **Recovery.** Reload the page while the assistant is waiting for the app\n  to perform an action and the reloaded page performs it and continues.\n- **Two model roles in parallel.** *Talk live* puts GPT-Live on the\n  conversation while a separate design controller turns what you say into\n  document edits through the same six actions, each decision on the model\n  you pick in the header. See [docs/voice.md](docs/voice.md).\n\n## The demo\n\nWith both processes running and Google Chrome installed, `bun run demo`\ndrives the text-chat workflow through the real app and writes screenshots\nand a table of timings and costs to `.tmp/demo/`:\n\n1. Ask for a payment service. The assistant creates the document and draws\n   the first diagram.\n2. Ask for it left to right with a dead-letter queue. It edits the blocks.\n3. Ask for something that makes Mermaid fail. It reads the parse error and\n   repairs the diagram.\n4. Try a variant of step 2 as a sequence diagram, then switch between the\n   two branches.\n5. Nudge the assistant mid-answer, then cancel it; the partial answer\n   stays.\n6. Drop a whiteboard photo and ask for it as a diagram.\n7. Ask whether the queue is readable; the assistant looks at the preview.\n8. Reload the page while an edit is pending; the reloaded page finishes it.\n9. State a lasting preference; approve the style-guide change it proposes.\n10. Read the cost per message and for the session.\n\nThe demo makes real model calls; duration and cost depend on the configured\nmodel. `DEMO_STEPS=1,2 bun run demo` runs a subset. Supply an image with\n`DEMO_PHOTO=/path/to/sketch.png bun run demo`; step 6 is skipped if no image\nis available (the default path is `.tmp/demo/whiteboard.png`).\n\n## How it is built\n\nNext.js and XState, in four layers that do not reach past each other:\ncomponents render props, hooks expose `{ state, data, actions }`, machines\nhold every transition and side effect, and `lib/` contains pure helpers\nand runtime clients.\n\n| Directory | What lives there |\n|---|---|\n| `machines/` | `appMachine` (root), `filesMachine`, `documentMachine`, `assistantMachine`, `artifactsMachine`; `voiceMachine` and `designControllerMachine` for live calls |\n| `hooks/` | the bridge between machines and components |\n| `components/` | `assistant/`, `document/`, `layout/`, `ui/` |\n| `lib/` | block parsing and edits, host actions, stream folding, host context, the runtime client, IndexedDB, Mermaid, the voice and decision transports |\n| `types/` | Zod schemas for every wire shape |\n| `profiles/` | the assistant profile and its artifact texts |\n\nThe interesting file is `machines/assistantMachine.ts`: the socket, the\nstream folded into messages, and the pause on a pending host action that\nthe app answers with a continuation.\n\n```bash\nmake check  # tests, typecheck, lint and production build\n```\n\nContributor notes are in [AGENTS.md](AGENTS.md).\n\n## License\n\nMIT, see [LICENSE](LICENSE). The bundled Inter and JetBrains Mono fonts\nare under the SIL Open Font License; see\n[public/fonts/OFL.txt](public/fonts/OFL.txt).\n",
      "sessionId": "d64bb2b2-577d-4797-92fa-4653b13a671a",
      "updatedAt": "2026-10-26T14:17:55.002Z"
    }
  ]
}

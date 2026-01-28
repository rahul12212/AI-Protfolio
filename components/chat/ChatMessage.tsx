
export type ChatMsg = { role: 'user'|'assistant'|'system'; content: string };
export function ChatMessage({ msg }: { msg: ChatMsg }){
  return (<div className="grid gap-1"><div className="text-xs uppercase text-neutral-400">{msg.role}</div>
    <div className="rounded-xl border border-border bg-card p-3 shadow whitespace-pre-wrap">{msg.content}</div></div>);
}

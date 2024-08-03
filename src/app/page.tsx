import TypingArea from "./components/Typing/TypingArea";

export default function Home() {
  const targetText = "testing 1 2 3 4 "

  return (
    <div>
        <TypingArea targetText={targetText} />
    </div>
  )
}

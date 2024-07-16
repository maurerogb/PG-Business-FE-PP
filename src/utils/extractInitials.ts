export function extractInitials(word: string) {
  if (typeof word !== "string") {
    return ""
  }

  const words = word.split(" ")
  const initials = []

  for (const w of words) {
    if (!w) continue
    initials.push(w[0].toUpperCase())
  }

  return initials.join("")
}

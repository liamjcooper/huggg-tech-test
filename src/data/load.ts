import path from 'path'

export default async <T>(filename: string): Promise<T> => {
  const file = await Bun.file(
    path.join(process.cwd(), 'src', 'data', filename),
    { type: 'application/json' }
  ).text()

  return JSON.parse(file)
}

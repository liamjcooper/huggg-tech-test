import path from 'path'
import type { BrandsData } from '../types/Brand'

export default async (): Promise<BrandsData> => {
  const file = await Bun.file(
    path.join(process.cwd(), 'src', 'data', 'brands.json'),
    { type: 'application/json' }
  ).text()
  return JSON.parse(file)
}

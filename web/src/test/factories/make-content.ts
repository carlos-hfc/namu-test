import { faker } from "@faker-js/faker"
import { type Content } from "@namu-test/shared"

export interface MockContent extends Content {
  isFavorite: boolean
}

export function makeContent(overrides: Partial<MockContent> = {}): MockContent {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    title: faker.lorem.sentence({ min: 3, max: 5 }),
    category: faker.helpers.arrayElement(["Meditação", "Yoga", "Nutrição"]),
    type: faker.helpers.arrayElement(["article", "audio", "video"]),
    instructor: faker.person.fullName(),
    durationSeconds: faker.number.int({ min: 180, max: 3600 }),
    thumbnailUrl: null,
    publishedAt: faker.date.recent().toISOString(),
    description: faker.lorem.paragraph(),
    isFavorite: false,
    ...overrides,
  }
}

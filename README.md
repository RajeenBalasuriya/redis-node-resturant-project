# Bites - Node, Redis, TypeScript & Express Backend

This repo is an example of using Redis in node with the node-redis package. Learn how to build a node backend and use Redis's speed. Let's have a look at the basic Redis data types, then some modern features such as RedisJSON, Redis Search and Bloom filters. Shows how we can use Redis as a cache for 3rd party APIs as well.

Utilises the following:

- Node
- Express
- Redis (Hashes, Lists,Strings)
- TypeScript
- Zod validation (& Express middleware)


## Usage

To use this project, you will first need to have a running Redis Stack instance. View the [Redis guide](https://redis.io/docs/latest/operate/oss_and_stack/install/) to get this set-up on your environment

### Development

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm run dev`

### Production

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm run build`
4. Run `pnpm run start`


function info() {
  return `This is the API of a Hackernews Clone`;
};

async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { description: { contains: args.filter } },
        { url: { contains: args.filter } },
      ],
    }
    : {}

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
  })

  return links
}

async function link(parent, { id }, context) {
  return await context.prisma.link.findUnique({
    where: { id: parseInt(id) }
  });
}

module.exports = {
  info,
  feed,
  link,
}
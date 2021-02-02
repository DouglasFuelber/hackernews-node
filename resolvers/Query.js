function info() {
  return `This is the API of a Hackernews Clone`;
};

function feed(parent, args, context) {
  return context.prisma.link.findMany();
}

function link(parent, { id }, context) {
  return context.prisma.link.findUnique({
    where: { id: parseInt(id) }
  });
}

module.exports = {
  info,
  feed,
  link,
}
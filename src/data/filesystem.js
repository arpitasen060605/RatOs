const filesystem = {
  name: "home",
  type: "folder",
  children: [
    {
      name: "cheese",
      type: "folder",
      children: [
        { name: "inventory.txt", type: "file", content: "12 cheeses collected so far. Moon Cheese still uneaten." },
      ],
    },
    {
      name: "secrets",
      type: "folder",
      children: [
        { name: "plan.txt", type: "file", content: "The humans still don't know about the tunnel beneath the kitchen." },
        { name: "do_not_open.txt", type: "file", content: "You weren't supposed to find this." },
      ],
    },
    {
      name: "notes",
      type: "folder",
      children: [
        { name: "todo.txt", type: "file", content: "1. Steal cheese\n2. Avoid cat\n3. ???\n4. Profit" },
      ],
    },
    { name: "readme.txt", type: "file", content: "Welcome to your burrow. Try not to lose anything important." },
  ],
}

export default filesystem
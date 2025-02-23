const getInitials = (name: string) => {
  const [firstName, ...restNames] = name.trim().split(" ");

  if (restNames.length === 0) {
    return firstName.charAt(0);
  }

  const lastName = restNames.pop() || "";

  return firstName.charAt(0) + lastName.charAt(0);
};

export default getInitials;

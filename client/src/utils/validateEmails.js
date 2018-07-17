const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
  if (!emails) return null;

  const invalidEmails = emails
    // get rid of the trailing comma or comma+space
    .replace(/(,|,\s)$/, '')
    .split(',')
    .map((email) => email.trim())
    // capture emails that don't match the regex
    .filter((email) => re.test(email) === false);

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails.join(', ')}`;
  }

  return null;
};

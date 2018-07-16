const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

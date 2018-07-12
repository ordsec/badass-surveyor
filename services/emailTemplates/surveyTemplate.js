module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>We want to hear from you!</h3>
          <p>${survey.body}</p>
          <div>
            <a href="http://localhost:3000">Oh yeah!</a>
          </div>
          <div>
            <a href="http://localhost:3000">Nope, not a fan.</a>
          </div>
        </div>
      </body>
    </html>
  `;
};

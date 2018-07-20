const keys = require('../../config/keys');

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>We want to hear from you!</h3>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/yourock">Oh yeah!</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/surveys/yourock">Nope, not a fan.</a>
          </div>
        </div>
      </body>
    </html>
  `;
};

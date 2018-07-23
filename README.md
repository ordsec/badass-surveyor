## Badass Surveyor

https://badass-surveyor.herokuapp.com

### Functionality
The application allows a user to create and send out surveys to collect feedback about an application
(or anything, really). The service is paid - each survey costs one credit, and the cost per credit is
$1.00.

### Usage
Badass Surveyor uses Google Auth for user accounts, so you will need a Google account to sign in. No
registration is necessary. To purchase some credits, use the following credit card info:

- Any bogus email like userunknown@somewhere.net (make sure it's not a real domain like gmail.com)
- Credit card number: 4242 4242 4242 4242
- Any expiration date in the future, e.g. (11/29)

Payments are processed through Stripe in test mode, so no real credit card will be accepted (much as
I'd like to take your money ;-) )! The amount is fixed at $5.00, which gives you 5 credits.

Once you have some credits, you can go ahead and create a survey:

- Title: the title of the survey that will only be shown in the app
- Subject: the subject of the email that will be sent out to your recipients
- Body: what you are trying to find out (e.g. 'Do you like our awesome app?')
- Recipients: a comma-separated list of email addresses the survey will go out to

You will be able to preview all of the details before sending the survey out. Warning: pressing
the 'Send' button from the preview screen will send the survey out, without asking if you're sure!

All of your surveys will appear in your dashboard. The app uses a webhook to track responses from
your recipients. At this stage, the only response options are Yes and No. Also, the 'From' email
address is set to noreply@badass-surveyor.com - future updates will make this customizable.

### Stack and APIs
General:
- Node.js

Back end:
- MongoDB
- Express.js

Front end:
- React.js
- Redux
- Materialize.css

API services the app relies upon:
- Google Auth
- SendGrid (for emails)
- Stripe (for payments)

(c) 2018 Made with <3 by David Ordovskiy

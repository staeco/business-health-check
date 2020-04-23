# Business Health Check

This project provides a toolkit to call every registered business in a city and perform an automated health check over the phone.

Do you need help performing a health check of your local businesses? [Contact us](mailto:we@stae.co) - we would love to help you out!

## Installation

```sh
git clone https://github.com/staeco/business-health-check
cd business-health-check
yarn
```

## Configuration

- Rename `config/keys.json` to `config/secret-keys.json`
- Create a Twilio account and provide your account ID, access token, and phone number in the `config/secret-keys.json` file.
- Edit the `config/prompt.json` file and update the greeting and options for your locality.

## Performing a Survey

```sh
yarn download <municipal.systems business export URL>
yarn create-plan
yarn execute
yarn finish
```

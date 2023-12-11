import {device, element} from 'detox';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
describe("When requesting a password reset", () => {
    describe("with no deep link", () => {
        beforeAll(async () => {
            await device.launchApp({newInstance: true});
        });

        it('should show token as undefined', async () => {
            await waitFor(element(by.text("Reset password"))).toBeVisible().withTimeout(5000)
            await element(by.text("Reset password")).tap()
            await expect(element(by.text("Token: undefined"))).toBeVisible()
        });
    });

    describe("when opening from a regular deep link", () => {
        const token = "hamster"
        beforeEach(async () => {
            await device.launchApp({newInstance: true, url: `/reset-password?token=${token}`});
        });

        it('should show token', async () => {
            await waitFor(element(by.text(`Token: ${token}`))).toBeVisible().withTimeout(5000)
        });
    });
});

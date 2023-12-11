import {device, element, expect as dExpect, waitFor, by} from 'detox';
describe("When requesting a password reset", () => {
  describe("with no deep link", () => {
    beforeAll(async () => {
      await device.launchApp({newInstance: true});
    });

    it('should show token as undefined', async () => {
      await waitFor(element(by.text("Reset password"))).toBeVisible().withTimeout(2000)
      await element(by.text("Reset password")).tap()
      await dExpect(element(by.text("Token: undefined"))).toBeVisible()
    });

    it('should show test environment variable', async () => {
      await waitFor(element(by.text("Env Var: kitten"))).toBeVisible().withTimeout(2000)
    })
  });

  describe("when opening from a regular deep link", () => {
    const token = "hamster"
    beforeEach(async () => {
      await device.launchApp({newInstance: true, url: `/reset-password?token=${token}`});
    });

    it('should show token', async () => {
      await waitFor(element(by.text(`Token: ${token}`))).toBeVisible().withTimeout(2000)
    });
  });
});

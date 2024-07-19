import { test, expect } from '@playwright/test'

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/contact')
  })

  test('form header and container visibility & appearance', async ({
    page,
  }) => {
    await expect(
      page
        .locator('div')
        .filter({ hasText: 'Contact SupportFill out the' })
        .nth(1)
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Contact Support' })
    ).toBeVisible()
    await expect(page.getByText('Fill out the form below and')).toBeVisible()
  })

  test('contact form first name visibility, appearance and functionality test', async ({
    page,
  }) => {
    await expect(page.getByPlaceholder('Enter your first name')).toBeVisible()
    await expect(page.getByText('First name')).toBeVisible()
    await page.getByPlaceholder('Enter your first name').click()
    await page.getByPlaceholder('Enter your first name').fill('TestFirstName')
    await expect(page.getByPlaceholder('Enter your first name')).toHaveValue(
      'TestFirstName'
    )
  })

  test('contact form last name visibility, appearance and functionality test', async ({
    page,
  }) => {
    await expect(page.getByPlaceholder('Enter your last name')).toBeVisible()
    await expect(page.getByText('Last name')).toBeVisible()
    await page.getByPlaceholder('Enter your last name').click()
    await page.getByPlaceholder('Enter your last name').fill('TestSecondName')
    await expect(page.getByPlaceholder('Enter your last name')).toHaveValue(
      'TestSecondName'
    )
  })

  test('contact form email visibility, appearance and functionality test', async ({
    page,
  }) => {
    await expect(page.getByPlaceholder('Enter your first name')).toBeVisible()
    await expect(page.getByText('Email')).toBeVisible()
    await page.getByPlaceholder('Enter your email').click()
    await page.getByPlaceholder('Enter your email').fill('test@gmail.com')
    await expect(page.getByPlaceholder('Enter your email')).toHaveValue(
      'test@gmail.com'
    )
  })

  test('contact form message visibility, appearance and functionality test', async ({
    page,
  }) => {
    await expect(page.getByText('Message', { exact: true })).toBeVisible()
    await expect(page.getByPlaceholder('Enter your message')).toBeVisible()
    await page.getByPlaceholder('Enter your message').click()
    await page
      .getByPlaceholder('Enter your message')
      .fill('No complaints, love the application!')
    await expect(page.getByPlaceholder('Enter your message')).toHaveValue(
      'No complaints, love the application!'
    )
  })

  test('contact form submit button visibility, appearance and functionality test', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: 'Send message' })
    ).toBeVisible()
    await expect(page.getByRole('button')).toContainText('Send message')
    await page.getByRole('button', { name: 'Send message' }).click()
  })
})

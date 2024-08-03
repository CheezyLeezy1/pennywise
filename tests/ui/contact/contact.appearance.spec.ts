import { test, expect } from '@playwright/test'
import {baseUrl} from "@/lib/definitions";

test.describe('Contact Form Validation and Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl)
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
    await page.getByPlaceholder('Enter your last name').fill('TestLastName')
    await expect(page.getByPlaceholder('Enter your last name')).toHaveValue(
      'TestLastName'
    )
  })

  test('contact form email visibility, appearance and functionality test', async ({
    page,
  }) => {
    await expect(page.getByPlaceholder('Enter your email')).toBeVisible()
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

  test('validation: empty form submission', async ({ page }) => {
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByText('First name must be at least 2 characters')
    ).toBeVisible()
    await expect(
      page.getByText('Last name must be at least 2 characters')
    ).toBeVisible()
    await expect(page.getByText('Invalid email address')).toBeVisible()
    await expect(
      page.getByText('Message must be at least 10 characters')
    ).toBeVisible()
  })

  test('validation: lower bound for first name', async ({ page }) => {
    await page.getByPlaceholder('Enter your first name').fill('A')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByText('First name must be at least 2 characters')
    ).toBeVisible()
  })

  test('validation: upper bound for first name', async ({ page }) => {
    await page.getByPlaceholder('Enter your first name').fill('A'.repeat(21))
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByText('First name must be at most 20 characters')
    ).toBeVisible()
  })

  test('validation: lower bound for last name', async ({ page }) => {
    await page.getByPlaceholder('Enter your last name').fill('B')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByText('Last name must be at least 2 characters')
    ).toBeVisible()
  })

  test('validation: upper bound for last name', async ({ page }) => {
    await page.getByPlaceholder('Enter your last name').fill('B'.repeat(31))
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByText('Last name must be at most 30 characters')
    ).toBeVisible()
  })

  test('validation: lower bound for message', async ({ page }) => {
    await page.getByPlaceholder('Enter your message').fill('Short')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByText('Message must be at least 10 characters')
    ).toBeVisible()
  })

  test('validation: valid input and successful submission', async ({
    page,
  }) => {
    await page.getByPlaceholder('Enter your first name').fill('John')
    await page.getByPlaceholder('Enter your last name').fill('Doe')
    await page.getByPlaceholder('Enter your email').fill('john.doe@example.com')
    await page
      .getByPlaceholder('Enter your message')
      .fill('This is a valid message with more than ten characters.')
    await page.getByRole('button', { name: 'Send message' }).click()
    await expect(
      page.getByRole('heading', { name: 'Success ✅' })
    ).toBeVisible()
    await expect(
      page.getByText('Your message has been sent successfully!')
    ).toBeVisible()
  })
})

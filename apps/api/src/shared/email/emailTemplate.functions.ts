import { User } from './email.types'

export const formatNameForEmail = function (user: User) {
  return `${user.user_profile.first_name} ${user.user_profile.last_name.slice(0, 1)}.`
}

/**
 * Returns a HTML string with the primary text style (purple bold text).
 * @param {string} content - The content to style.
 * @returns {string} The styled content.
 */
export const primaryText = function (content: string) {
  return `<span style="font-size: 24px !important; font-weight: bold !important; color: #6D28D9 !important;">${content}</span>`
}

/**
 * Returns a HTML string with the dark box style (gray background with rounded corners and padding).
 * @param {string} content - The content to style.
 * @returns {string} The styled content.
 */
export const darkBox = function (content: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 20px 0;">
    <tr>
      <td style="background-color: #f8f8f8; padding: 15px; border-radius: 8px;">
        ${content}
      </td>
    </tr>
  </table>`
}

/**
 * Returns a HTML string with the paragraph style (regular text).
 * @param {string} content - The content to style.
 * @returns {string} The styled content.
 */
export const paragraph = function (content: string, textAlign: 'left' | 'center' = 'center'): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="${textAlign}" style="padding: 10px 0;">
        ${content}
      </td>
    </tr>
  </table>`
}

/**
 * Returns a HTML string with the bold text style.
 * @param {string} content - The content to style.
 * @returns {string} The styled content.
 */
export const boldText = function (content: string): string {
  return `<span style="font-weight: bold !important;">${content}</span>`
}

/**
 * Returns a HTML string with the item request style.
 * @param {string} itemImageUrl - The URL of the item image.
 * @param {string} truncatedItemName - The truncated item name.
 * @param {string} price - The price of the item.
 * @param {string} priceLabel - The label of the price.
 * @returns {string} The styled content.
 */
export const formatItemRequest = function (
  itemImageUrl: string,
  truncatedItemName: string,
  price: string,
  itemQuantity: number,
  priceLabel: string
): string {
  return `<table cellpadding="0" cellspacing="0" border="0" width="95%" style="margin: 12px auto; margin-bottom: 0px; border: 1px solid #eee; border-radius: 8px;">
    <tr>
      <td style="padding: 12px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="80" valign="center" style="padding-right: 12px;">
              <img src="${itemImageUrl}" alt="Item" width="80" style="border-radius: 4px; display: block;">
            </td>

            <td valign="center" style="width: 70%;">
              <div style="font-size: 14px !important; font-weight: 500 !important; margin-bottom: 4px !important;">
                ${truncatedItemName}
              </div>

              <div style="font-size: 12px !important; color: #666666 !important; !important;">
                Quantity: ${itemQuantity}
              </div>
            </td>

            <td valign="center" style="min-width: 100px; text-align: right;">
              <div style="font-size: 16px !important; font-weight: 600 !important; color: #000000 !important;">
                ${price}
              </div>

              <div style="font-size: 12px !important; color: #666666 !important; margin-top: 2px !important;">
                ${priceLabel}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`
}

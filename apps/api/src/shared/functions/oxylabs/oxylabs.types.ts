import { GetItemDetailsResponse } from '../../../api/user/items/items.types'

export interface AmazonProductInfoRequest {
  source: string
  url: string
  parse: boolean
}

export interface AmazonProductInfoResponse {
  results: Array<{
    content: {
      ads: Array<{
        pos: number
        asin: string
        type: string
        price: number
        title: string
        images: string[]
        rating: number
        location: string
        price_upper: number
        reviews_count: number
        is_prime_eligible: boolean
      }>
      url: string
      asin: string
      page: number
      brand: string
      price: number
      stock: string
      title: string
      buybox: Array<{
        price: number
        stock: string
        condition: string
        delivery_type: string
        delivery_details: Array<{
          date: {
            by: string
            from: string | null
          }
          type: string
        }>
      }>
      coupon: string
      images: string[]
      rating: number
      category: Array<{
        ladder: Array<{
          url: string
          name: string
        }>
      }>
      currency: string
      delivery: Array<{
        date: {
          by: string
          from: string | null
        }
        type: string
      }>
      _warnings: string[]
      page_type: string
      price_sns: number
      variation: Array<{
        asin: string
        selected: boolean
        dimensions: {
          [key: string]: string
        }
        tooltip_image: string
      }>
      has_videos: boolean
      sales_rank: Array<{
        rank: number
        ladder: Array<{
          url: string
          name: string
        }>
      }>
      top_review: string
      asin_in_url: string
      buy_it_with: Array<{
        asin: string
        price: number
        title: string
      }>
      description: string
      parent_asin: string
      price_upper: number
      pricing_str: string
      pricing_url: string
      manufacturer: string
      max_quantity: number
      price_buybox: number
      product_name: string
      sales_volume: string
      bullet_points: string
      price_initial: number
      pricing_count: number
      reviews_count: number
      sns_discounts: unknown[]
      developer_info: unknown[]
      price_shipping: number
      product_details: {
        asin: string
        batteries: string
        department: string
        item_weight: string
        manufacturer: string
        customer_reviews: string
        best_sellers_rank: string
        country_of_origin: string
        item_model_number: string
        product_dimensions: string
        package_dimensions: string
        date_first_available: string
      }
      featured_merchant: unknown[]
      is_prime_eligible: boolean
      parse_status_code: number
      product_dimensions: string
      discount_percentage: number
      price_strikethrough: number
      answered_questions_count: number
      frequently_bought_together: Array<{
        asin: string
      }>
    }
    created_at: string
    updated_at: string
    page: number
    url: string
    job_id: string
    status_code: number
    parser_type: string
  }>
  job: {
    callback_url: string
    client_id: number
    context: Array<{
      key: string
      value: string | boolean | null
    }>
    created_at: string
    domain: string
    geo_location: string | null
    id: string
    limit: number
    locale: string | null
    pages: number
    parse: boolean
    parser_type: string | null
    parsing_instructions: string | null
    browser_instructions: string | null
    render: string | null
    url: string
    query: string
    source: string
    start_page: number
    status: string
    storage_type: string | null
    storage_url: string | null
    subdomain: string
    content_encoding: string
    updated_at: string
    user_agent_type: string
    session_info: string | null
    statuses: unknown[]
    client_notes: string | null
    _links: Array<{
      rel: string
      href: string
      method: string
    }>
  }
}

export enum StockStatus {
  InStock = 'In Stock',
  OutOfStock = 'Out of Stock',
  LowStock = 'Low Stock'
}

export type BulkAmazonProductInfoResponse = GetItemDetailsResponse

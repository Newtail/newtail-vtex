import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

export const apiNewtailRetailMedia = axios.create({
  baseURL: `https://newtail-media.newtail.com.br/v1/rma`,
} as CreateAxiosDefaults<{ baseURL: string }>)

export const getNewtailMedia = async ({ publisherId, body }: AdsRequest) =>
  apiNewtailRetailMedia.post<AdsResponse>(`/${publisherId}`, body)

export const postNewtailMediaConversionURL =
  'https://newtail-media.newtail.com.br/v1/beacon/conversion'

import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import AlbumView from '@/views/AlbumView.vue' // Adjust the path as necessary

// Define the mockAxiosResponse function
function mockAxiosResponse(data: any): AxiosResponse<any> {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {
      headers: {}
    } as InternalAxiosRequestConfig
  }
}

vi.mock('axios')

describe('Album view page', () => {
  const mockAlbumsData = { id: 1, title: 'Album 1' }
  const mockPhotosData = [
    {
      id: 1,
      albumId: 1,
      title: 'Photo 1',
      url: 'http://example.com/photo1',
      thumbnailUrl: 'http://example.com/photo1_thumb'
    },
    {
      id: 2,
      albumId: 1,
      title: 'Photo 2',
      url: 'http://example.com/photo2',
      thumbnailUrl: 'http://example.com/photo2_thumb'
    }
  ]

  beforeEach(() => {
    vi.mocked(axios.get).mockImplementation((url: string): Promise<AxiosResponse<any>> => {
      if (url.includes('/albums')) {
        return Promise.resolve(mockAxiosResponse(mockAlbumsData))
      } else if (url.includes('/photos')) {
        return Promise.resolve(mockAxiosResponse(mockPhotosData))
      }

      return Promise.reject(new Error('not found'))
    })
  })

  it('shows album information and its photos', async () => {
    const wrapper = mount(AlbumView, {
      props: { id: '1' }
    })

    await flushPromises()

    expect(wrapper.text()).toContain("List of Album 1's photos:")

    const photoElements = wrapper.findAll('img[alt="Thumbnail"]')
    expect(photoElements.length).toBe(mockPhotosData.length)
    photoElements.forEach((img, index) => {
      expect(img.attributes('src')).toBe(mockPhotosData[index].thumbnailUrl)
    })

    const photoTitles = wrapper.findAll('p.text-sm.font-medium.text-end')
    expect(photoTitles.length).toBe(mockPhotosData.length)
    photoTitles.forEach((title, index) => {
      expect(title.text()).toBe(mockPhotosData[index].title)
    })
  })
})

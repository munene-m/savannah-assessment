import { flushPromises, mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'
import AlbumView from '@/views/AlbumView.vue'

vi.mock('axios')

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

describe('User view page', () => {
  const mockUserData = { id: 1, name: 'John Doe' }
  const mockAlbumsData = [
    { id: 1, title: 'Album 1' },
    { id: 2, title: 'Album 2' }
  ]
  beforeEach(() => {
    vi.mocked(axios.get).mockImplementation((url: string): Promise<AxiosResponse<any>> => {
      if (url.includes('/users')) {
        return Promise.resolve(mockAxiosResponse(mockUserData))
      } else if (url.includes('/albums')) {
        return Promise.resolve(mockAxiosResponse(mockAlbumsData))
      }

      return Promise.reject(new Error('not found'))
    })
  })

  it('fetches user data and displays user name and their albums', async () => {
    const wrapper = mount(UserView, {
      props: { id: '1' }
    })
    await flushPromises()

    expect(wrapper.text()).toContain("List of John Doe's albums:")

    const albums = wrapper.findAll('li')
    expect(albums).toHaveLength(2)
    expect(albums[0].text()).toBe('Album 1')
    expect(albums[1].text()).toBe('Album 2')
  })

  it('displays loading state initially', () => {
    const wrapper = mount(UserView, {
      props: { id: '1' }
    })

    expect(wrapper.text()).toContain('Loading user data...')
  })

  it('navigates to album page on album click', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/album/:id', name: 'user', component: AlbumView, props: true }]
    })

    const wrapper = mount(UserView, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()

    await flushPromises()

    const album = wrapper.find('li')
    await album.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/album/1')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { mount, flushPromises } from '@vue/test-utils'
import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import UserView from '@/views/UserView.vue'

const mockUsers = [
  { id: 1, name: 'Leanne Graham', albumCount: 2 },
  { id: 2, name: 'Ervin Howell', albumCount: 1 }
]
const mockAlbums = [
  { userId: 1, id: 1, title: 'Album 1' },
  { userId: 1, id: 2, title: 'Album 2' },
  { userId: 2, id: 3, title: 'Album 3' }
]

vi.mock('axios')
// Mock implementation for Firebase Auth check
vi.mock('firebase/app', () => {
  return {
    auth: vi.fn().mockReturnValue({
      currentUser: {
        uid: 'test-user',
        email: 'test@example.com'
      }
    })
  }
})

describe('HomePage', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockImplementation((url: string) => {
      if (url.includes('/users')) {
        return Promise.resolve({ data: mockUsers })
      } else if (url.includes('/albums')) {
        return Promise.resolve({ data: mockAlbums })
      }
    })
  })
  it('renders properly', () => {
    const wrapper = mount(HomeView, { props: { msg: 'Number of albums per user' } })
    expect(wrapper.text()).toContain('Number of albums per user')
  })
  it('shows list of users and number of albums they have', async () => {
    const wrapper = mount(HomeView)
    await flushPromises()

    const userListItems = wrapper.findAll('li')
    expect(userListItems).toHaveLength(mockUsers.length)
    expect(userListItems[0].text()).toContain('Leanne Graham (2 albums)')
    expect(userListItems[1].text()).toContain('Ervin Howell (1 albums)')
  })
  it('displays the user and number of albums they have', async () => {
    const wrapper = mount(HomeView)
    await flushPromises()

    expect(wrapper.find('.loading').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Loading user data...')

    const userListItems = wrapper.findAll('li')
    expect(userListItems).toHaveLength(mockUsers.length)

    const usersWithAlbumCounts = [
      { id: 1, name: 'Leanne Graham', albumCount: 2 },
      { id: 2, name: 'Ervin Howell', albumCount: 1 }
    ]

    usersWithAlbumCounts.forEach((user, index) => {
      const listItem = userListItems[index]
      expect(listItem.text()).toContain(user.name)
      expect(listItem.text()).toContain(`${user.albumCount} albums`)
    })
  })

  it('navigates to user page on click', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/user/:id', name: 'user', component: UserView, props: true }]
    })

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
    await flushPromises()

    const userListItem = wrapper.find('li')
    await userListItem.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/user/1')
  })
})

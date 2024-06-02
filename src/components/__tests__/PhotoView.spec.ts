import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import PhotoComponent from '@/views/PhotoView.vue'
import { Database, ref as dbRef, get, update } from 'firebase/database'

vi.mock('firebase/database', () => {
  return {
    getDatabase: vi.fn(),
    ref: vi.fn(),
    get: vi.fn(),
    update: vi.fn()
  }
})

vi.mock('firebase/auth', () => {
  const mockAuth = {
    currentUser: {
      uid: 'test-user'
    }
  }
  return {
    getAuth: vi.fn(() => mockAuth)
  }
})

describe('PhotoComponent', () => {
  const mockPhotoData = {
    title: 'Test Photo',
    url: 'https://via.placeholder.com/150'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders photo and title', async () => {
    ;(get as any).mockResolvedValue({ exists: () => true, val: () => mockPhotoData })

    const wrapper = mount(PhotoComponent)

    await flushPromises()

    expect(wrapper.find('h1').text()).toBe(mockPhotoData.title)
    expect(wrapper.find('img').attributes('src')).toBe(mockPhotoData.url)
  })

  it('enters edit mode and saves title', async () => {
    ;(get as any).mockResolvedValue({ exists: () => true, val: () => mockPhotoData })

    const wrapper = mount(PhotoComponent)

    await flushPromises()

    await wrapper.find('button').trigger('click')

    const input = wrapper.find('input')
    await input.setValue('New Test Title')

    await wrapper.find('button').trigger('click')

    await flushPromises()

    expect(wrapper.find('h1').text()).toBe('New Test Title')

    // Expect that the title is updated in the database
    expect(update).toHaveBeenCalledWith(dbRef(<Database>{}, `photos/photo1`), {
      title: 'New Test Title'
    })
  })
})

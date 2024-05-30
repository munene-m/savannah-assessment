import { flushPromises, mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { RouterLink } from 'vue-router'
import SignupView from '@/views/SignupView.vue'
import CustomButton from '@/components/CustomButton.vue'
import ArrowIcon from '@/components/icons/ArrowIcon.vue'
import { describe, expect, it } from 'vitest'
import LandingView from '@/views/LandingView.vue'

describe('LandingPage', () => {
  it('displays the landing page correctly', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'landing-page', component: LandingView },
        { path: '/signup', name: 'signup', component: SignupView }
      ]
    })

    const wrapper = mount(LandingView, {
      global: {
        plugins: [router],
        components: {
          CustomButton,
          ArrowIcon,
          RouterLink
        }
      }
    })
    await router.isReady()

    expect(wrapper.find('header').text()).toBe('Welcome to Album Showcase')

    expect(wrapper.find('h1').text()).toBe('Discover Amazing Albums')
    expect(wrapper.find('p').text()).toContain('This site allows you to browse through user albums')

    const img = wrapper.find('img[alt="Albums"]')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/src/assets/albums.jpg')

    const button = wrapper.findComponent(CustomButton)
    expect(button.exists()).toBe(true)

    const routerLink = button.findComponent(RouterLink)
    expect(routerLink.text()).toContain('Get started')

    await routerLink.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.fullPath).toBe('/signup')

    // Check if ArrowIcon is displayed within the button
    const arrowIcon = wrapper.findComponent(ArrowIcon)
    expect(arrowIcon.exists()).toBe(true)

    // Check if footer is displayed
    expect(wrapper.find('footer').text()).toBe('© 2024 Album Showcase')
  })
})

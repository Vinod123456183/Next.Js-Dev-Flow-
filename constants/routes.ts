// reusablity
// if change , so we have to change everyplace

const ROUTES = {
  HOME: '/',
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  PROFILE: (id: string) => `/profile${id}`,
  TAGS: (id: string) => `/tags/${id}`,
}

export default ROUTES

import { RouteDefinition } from '@src/types/route';

/**
 * All application route definitions.
 * Keys are internal route names (e.g., 'Feed'), values are route objects.
 * Route objects define the path, component, layout, and meta information for each route.
 */
const routeDefinitions: Record<string, RouteDefinition> = {
  // --- Public Routes (Authentication/Account Management) ---
  'Login': {
    path: '/login',
    component: () => import('@src/views/auth/LoginView.vue'),
    layout: 'AuthLayout',
    meta: {
      title: 'تسجيل الدخول',
      requiresAuth: false,
      hideIfAuthenticated: true,
    },
  },
  'Register': {
    path: '/register',
    component: () => import('@src/views/auth/RegisterView.vue'),
    layout: 'AuthLayout',
    meta: {
      title: 'إنشاء حساب جديد',
      requiresAuth: false,
      hideIfAuthenticated: true,
    },
  },
  'ForgotPassword': {
    path: '/forgot-password',
    component: () => import('@src/views/auth/ForgotPasswordView.vue'),
    layout: 'AuthLayout',
    meta: {
      title: 'نسيت كلمة المرور',
      requiresAuth: false,
      hideIfAuthenticated: true,
    },
  },

  // --- Main Application Routes (Requires Authentication) ---
  'Feed': {
    path: '/',
    component: () => import('@src/views/main/FeedView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'فيسبوك',
      requiresAuth: true,
      hasNavigation: true, // Indicates this route should have the main app navigation (sidebar/header)
    },
  },
  'Profile': {
    path: '/:username', // Uses username as path parameter
    component: () => import('@src/views/main/ProfileView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'الملف الشخصي',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Friends': {
    path: '/friends',
    component: () => import('@src/views/main/FriendsView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'الأصدقاء',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Marketplace': {
    path: '/marketplace',
    component: () => import('@src/views/main/MarketplaceView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'ماركت بليس',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Watch': {
    path: '/watch',
    component: () => import('@src/views/main/WatchView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'مقاطع الفيديو',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Groups': {
    path: '/groups',
    component: () => import('@src/views/main/GroupsView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'المجموعات',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Notifications': {
    path: '/notifications',
    component: () => import('@src/views/main/NotificationsView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'الإشعارات',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Messages': {
    path: '/messages',
    component: () => import('@src/views/main/MessagesView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'الرسائل',
      requiresAuth: true,
      hasNavigation: true,
    },
  },

  // --- Settings and Utility Routes ---
  'Settings': {
    path: '/settings',
    component: () => import('@src/views/settings/SettingsView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'الإعدادات والخصوصية',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'PostDetails': {
    path: '/posts/:postId',
    component: () => import('@src/views/details/PostDetailsView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'مشاهدة المنشور',
      requiresAuth: true,
      hasNavigation: true,
    },
  },
  'Search': {
    path: '/search',
    component: () => import('@src/views/search/SearchView.vue'),
    layout: 'AppLayout',
    meta: {
      title: 'نتائج البحث',
      requiresAuth: true,
      hasNavigation: true,
    },
  },

  // --- Error Handling ---
  'NotFound': {
    path: '/:catchAll(.*)',
    component: () => import('@src/views/errors/NotFoundView.vue'),
    layout: 'ErrorLayout',
    meta: {
      title: 'الصفحة غير موجودة',
      requiresAuth: false,
      hasNavigation: false,
    },
  },
};

export default routeDefinitions;
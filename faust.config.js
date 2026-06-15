import { setConfig } from "@faustwp/core";
import possibleTypes from "./possibleTypes.json";

/**
 * Faust Configuration
 * @type {import('@faustwp/core').FaustConfig}
 */
export default setConfig({
  /**
   * Templates configuration for ISR and static generation
   * Maps WordPress post types to Next.js page routes
   */
  templates: {
    /**
     * Post template - handles single posts
     * Route: /posts/[slug] or /blog/[slug]
     */
    post: {
      path: "/blog",
      uriPrefix: "/posts/", // WordPress URI prefix
    },

    /**
     * Page template - handles WordPress pages
     * Route: /[slug]
     */
    page: {
      uriPrefix: "/", // Maps to catch-all route
    },

    /**
     * Custom Evento CPT (events)
     * Route: /eventos/[slug]
     */
    evento: {
      path: "/eventos",
      uriPrefix: "/eventos/",
    },

    /**
     * Categories - for archive pages
     */
    category: {
      path: "/categoria",
      uriPrefix: "/category/",
    },

    /**
     * Tags - for tag pages
     */
    tag: {
      path: "/tag",
      uriPrefix: "/tag/",
    },
  },

  /**
   * Plugins for extending Faust functionality
   */
  plugins: [
    {
      name: "@faustwp/wp-plugin/index",
      path: "@faustwp/wp-plugin",
    },
  ],

  /**
   * GraphQL Schema types for proper type support
   */
  possibleTypes,

  /**
   * Experimental features
   */
  experimental: {
    /**
     * Enable server-side preview generation
     */
    serverSideAuth: false, // Using preview mode instead

    /**
     * Revalidation settings
     */
    revalidateOptions: {
      type: "on-demand", // 'on-demand' or 'interval'
      interval: 3600, // 1 hour in seconds
    },
  },

  /**
   * Debug and logging
   */
  debug: process.env.FAUST_DEBUG === "true",

  /**
   * Cache configuration
   */
  cacheStrategy: {
    type: "persistent", // 'in-memory' or 'persistent'
  },
});


// Grove — Mock Data Loader + Helpers
// Edit data in content/mock-data/001-seed-records.md
// Edit helpers here if needed
// Reads from window.MOCK_DATA set by mock-data-inline.js
;(function () {

  // ── Expect window.MOCK_DATA to be set before this file loads ──
  // Each HTML prototype screen must include:
  //   <script src="../shared/mock-data-inline.js"></script>
  //   <script src="../shared/mock-data.js"></script>

  var raw = window.MOCK_DATA
  if (!raw) {
    console.error('[Grove] mock-data.js: window.MOCK_DATA not set. Load mock-data-inline.js first.')
    return
  }

  // ── Date resolution ──────────────────────────────────────────
  var NOW = new Date(raw._meta.now)

  function resolveDate(val) {
    if (typeof val !== 'string') return val
    var ago = val.match(/^daysAgo_(\d+)$/)
    if (ago) return new Date(NOW.getTime() - parseInt(ago[1]) * 86400000).toISOString()
    var ahead = val.match(/^daysAhead_(\d+)$/)
    if (ahead) return new Date(NOW.getTime() + parseInt(ahead[1]) * 86400000).toISOString()
    return val
  }

  function resolveDates(obj) {
    if (Array.isArray(obj)) return obj.map(resolveDates)
    if (obj && typeof obj === 'object') {
      return Object.fromEntries(Object.entries(obj).map(function (entry) {
        return [entry[0], resolveDates(entry[1])]
      }))
    }
    return resolveDate(obj)
  }

  var data = resolveDates(raw)

  // ── Generic helpers ──────────────────────────────────────────

  function getById(collection, id) {
    return collection.find(function (item) { return item.id === id }) || null
  }

  function filterBy(collection, key, value) {
    return collection.filter(function (item) { return item[key] === value })
  }

  function paginate(array, page, perPage) {
    page = page || 1
    perPage = perPage || 20
    var total = array.length
    var totalPages = Math.ceil(total / perPage)
    var items = array.slice((page - 1) * perPage, page * perPage)
    return { items: items, total: total, page: page, perPage: perPage, totalPages: totalPages }
  }

  function sortBy(array, key, dir) {
    dir = dir || 'asc'
    return array.slice().sort(function (a, b) {
      if (a[key] < b[key]) return dir === 'asc' ? -1 : 1
      if (a[key] > b[key]) return dir === 'asc' ? 1 : -1
      return 0
    })
  }

  function search(collection, keys, query) {
    if (!query) return collection
    var q = query.toLowerCase()
    return collection.filter(function (item) {
      return keys.some(function (key) {
        return (item[key] || '').toLowerCase().indexOf(q) !== -1
      })
    })
  }

  // ── Domain helpers — Grove ───────────────────────────────────

  function getPropertyConversations(propertyId) {
    return filterBy(data.conversations, 'propertyId', propertyId)
  }

  function getConversationMessages(conversationId) {
    return sortBy(
      filterBy(data.messages, 'conversationId', conversationId),
      'createdAt',
      'asc'
    )
  }

  function getGuestProfile(guestId) {
    var guest = getById(data.guests, guestId)
    if (!guest) return null
    var conversations = filterBy(data.conversations, 'guestId', guestId)
    return Object.assign({}, guest, {
      conversations: conversations,
      messages: conversations.reduce(function (all, conv) {
        return all.concat(getConversationMessages(conv.id))
      }, [])
    })
  }

  function getPropertyKnowledge(propertyId) {
    return filterBy(data.knowledgeEntries, 'propertyId', propertyId)
  }

  function getPropertyTeam(propertyId) {
    var memberships = filterBy(data.propertyMembers, 'propertyId', propertyId)
    return memberships.map(function (m) {
      var user = getById(data.users, m.userId)
      return Object.assign({}, user, { role: m.role, membershipId: m.id })
    })
  }

  function getDashboardStats(propertyId) {
    var convos = getPropertyConversations(propertyId)
    var totalConversations = convos.length
    var aiHandled = convos.filter(function (c) { return c.aiHandled }).length
    var aiRatio = totalConversations > 0 ? Math.round((aiHandled / totalConversations) * 100) : 0
    var activeCount = convos.filter(function (c) { return c.status === 'active' }).length
    var waitingCount = convos.filter(function (c) { return c.status === 'waiting' }).length
    var resolvedCount = convos.filter(function (c) { return c.status === 'resolved' }).length

    // Simulate avg response time (minutes)
    var avgResponseTime = totalConversations > 0 ? 3.2 : 0

    var guests = filterBy(data.guests, 'propertyId', propertyId)
    var returningGuests = guests.filter(function (g) { return g.totalConversations > 1 }).length

    // Category breakdown
    var categories = {}
    convos.forEach(function (c) {
      var cat = c.category || 'other'
      categories[cat] = (categories[cat] || 0) + 1
    })

    return {
      totalConversations: totalConversations,
      activeConversations: activeCount,
      waitingConversations: waitingCount,
      resolvedConversations: resolvedCount,
      aiHandledCount: aiHandled,
      aiHandledPercent: aiRatio,
      avgResponseTimeMinutes: avgResponseTime,
      totalGuests: guests.length,
      returningGuests: returningGuests,
      categoryBreakdown: categories
    }
  }

  function getPlanLimits(tier) {
    return data.planLimits[tier] || data.planLimits.starter
  }

  function getPropertyQuickActions(propertyId) {
    return sortBy(
      filterBy(data.quickActions, 'propertyId', propertyId).filter(function (qa) {
        return !qa.isHidden
      }),
      'sortOrder',
      'asc'
    )
  }

  function getPropertyRoutingRules(propertyId) {
    return filterBy(data.routingRules, 'propertyId', propertyId)
  }

  function getPropertyAiVoiceConfig(propertyId) {
    return filterBy(data.aiVoiceConfig, 'propertyId', propertyId)[0] || null
  }

  function getGroupProperties(groupId) {
    return filterBy(data.properties, 'groupId', groupId)
  }

  function getPropertyInvites(propertyId) {
    return filterBy(data.invites, 'propertyId', propertyId)
  }

  // ── Export ───────────────────────────────────────────────────

  window.MOCK_DB = Object.assign({}, data, {
    helpers: {
      // Generic
      getById: getById,
      filterBy: filterBy,
      paginate: paginate,
      sortBy: sortBy,
      search: search,

      // Domain — Grove
      getPropertyConversations: getPropertyConversations,
      getConversationMessages: getConversationMessages,
      getGuestProfile: getGuestProfile,
      getPropertyKnowledge: getPropertyKnowledge,
      getPropertyTeam: getPropertyTeam,
      getDashboardStats: getDashboardStats,
      getPlanLimits: getPlanLimits,
      getPropertyQuickActions: getPropertyQuickActions,
      getPropertyRoutingRules: getPropertyRoutingRules,
      getPropertyAiVoiceConfig: getPropertyAiVoiceConfig,
      getGroupProperties: getGroupProperties,
      getPropertyInvites: getPropertyInvites
    },

    // Convenience defaults — primary demo context
    currentUser: getById(data.users, 'user_maria'),
    currentProperty: getById(data.properties, 'prop_linden')
  })

})()

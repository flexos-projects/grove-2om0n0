---
id: mock-data-seed-records
title: "Seed Records"
type: content
subtype: record
status: active
sequence: 1
collection: mock-data
relatesTo: [docs/005-database.md, docs/008-content.md]
createdAt: "2026-03-15"
updatedAt: "2026-03-15"
---

<flex_block type="instructions">
Complete seed data for all collections. Edit this file to update prototype data.
After editing, regenerate mock-data.json and mock-data-inline.js using flexos-mockdata.
</flex_block>

# Seed Records

## _meta

- **project:** Grove
- **now:** 2026-03-15

## Groups

| id | name | ownerUserId | stripeCustomerId | createdAt |
|----|------|-------------|------------------|-----------|
| group_haus | Haus Hotel Group | user_anika | cus_haus_001 | daysAgo_120 |

## Properties

| id | name | address | timezone | description | phoneNumber | twilioSid | greetingMessage | aiVoice | checkInTime | checkOutTime | operatingHoursStart | operatingHoursEnd | planTier | stripeCustomerId | stripeSubscriptionId | groupId | conversationCount | conversationLimit | createdAt |
|----|------|---------|----------|-------------|-------------|-----------|-----------------|---------|-------------|--------------|---------------------|-------------------|----------|------------------|----------------------|---------|-------------------|-------------------|-----------|
| prop_linden | The Linden | 1401 S Congress Ave, Austin, TX 78704 | America/Chicago | A 32-room boutique hotel on South Congress, blending mid-century design with Texas warmth. | +15125550147 | PN_linden_001 | Welcome to The Linden! Text us anytime for restaurant recommendations, directions, or anything else during your stay. We're here to help. | warm | 15:00 | 11:00 | 07:00 | 23:00 | professional | cus_linden_001 | sub_linden_001 | null | 127 | null | daysAgo_180 |
| prop_maison | Maison Blanc | 42 Queen St, Charleston, SC 29401 | America/New_York | An 18-room historic inn in downtown Charleston with French-inspired interiors and a courtyard garden. | +18435550238 | PN_maison_001 | Welcome to Maison Blanc! We're here to help make your Charleston stay unforgettable. Just text us anytime. | formal | 15:00 | 11:00 | 08:00 | 22:00 | starter | cus_maison_001 | sub_maison_001 | null | 43 | 500 | daysAgo_90 |
| prop_haus | Haus Berlin | Torstrasse 65, 10119 Berlin, Germany | Europe/Berlin | A 24-room design hotel in Berlin-Mitte, minimalist aesthetics with a neighbourhood feel. | +4930550194 | PN_haus_001 | Willkommen im Haus Berlin! Text us for local tips, transport help, or anything else you need during your stay. | casual | 14:00 | 12:00 | 07:00 | 00:00 | group | cus_haus_001 | sub_haus_001 | group_haus | 89 | null | daysAgo_120 |

## Users

| id | email | name | passwordHash | avatarUrl | lastActiveAt | createdAt |
|----|-------|------|-------------|-----------|--------------|-----------|
| user_maria | maria.chen@thelinden.com | Maria Chen | $argon2_hashed | null | daysAgo_0 | daysAgo_180 |
| user_david | david.park@thelinden.com | David Park | $argon2_hashed | null | daysAgo_0 | daysAgo_150 |
| user_sarah_m | sarah.mitchell@maisonblanc.com | Sarah Mitchell | $argon2_hashed | null | daysAgo_1 | daysAgo_90 |
| user_anika | anika.weber@haushotels.de | Anika Weber | $argon2_hashed | null | daysAgo_0 | daysAgo_120 |
| user_tom | tom.reeves@haushotels.de | Tom Reeves | $argon2_hashed | null | daysAgo_2 | daysAgo_60 |

## Property Members

| id | userId | propertyId | role | notifyBrowserPush | notifyEmailDigest | notifySound | createdAt |
|----|--------|------------|------|-------------------|-------------------|-------------|-----------|
| pm_maria_linden | user_maria | prop_linden | admin | true | true | true | daysAgo_180 |
| pm_david_linden | user_david | prop_linden | staff | true | false | true | daysAgo_150 |
| pm_sarah_maison | user_sarah_m | prop_maison | admin | true | true | true | daysAgo_90 |
| pm_anika_haus | user_anika | prop_haus | admin | true | true | true | daysAgo_120 |
| pm_tom_haus | user_tom | prop_haus | staff | false | false | true | daysAgo_60 |

## Invites

| id | propertyId | email | role | invitedByUserId | status | expiresAt | createdAt |
|----|------------|-------|------|-----------------|--------|-----------|-----------|
| inv_001 | prop_linden | jenny.liu@thelinden.com | staff | user_maria | pending | daysAhead_5 | daysAgo_2 |

## Guests

| id | propertyId | phoneNumber | name | preferences | staffNotes | totalConversations | firstContactAt | lastContactAt | createdAt |
|----|------------|-------------|------|-------------|------------|-------------------|----------------|---------------|-----------|
| guest_sarah_m | prop_linden | +15125559821 | Sarah Martinez | ["Italian food", "outdoor dining"] | First-time guest, visiting for SXSW. Very friendly. | 1 | daysAgo_3 | daysAgo_2 | daysAgo_3 |
| guest_james_t | prop_linden | +15125558334 | James Thompson | ["quiet room", "early checkout"] | Room 304. Complained about AC — resolved same day. | 1 | daysAgo_5 | daysAgo_4 | daysAgo_5 |
| guest_anna_k | prop_linden | +15125557102 | Anna Kowalski | ["high floor", "no down pillows", "French cuisine"] | Returning guest, 3rd visit. Always books the corner suite. | 3 | daysAgo_90 | daysAgo_1 | daysAgo_90 |
| guest_mike_r | prop_linden | +15125556478 | Mike Rivera | ["vegan", "yoga"] | Asked about yoga studios nearby. | 1 | daysAgo_1 | daysAgo_1 | daysAgo_1 |
| guest_lisa_w | prop_linden | +15125553290 | Lisa Wang | ["business traveller", "coffee snob"] | null | 2 | daysAgo_30 | daysAgo_7 | daysAgo_30 |
| guest_emma_b | prop_linden | +15125552145 | Emma Brooks | [] | Checked in yesterday, no requests yet. | 0 | daysAgo_1 | null | daysAgo_1 |
| guest_pierre_d | prop_maison | +18435551847 | Pierre Delacroix | ["wine enthusiast", "history buff"] | Visiting from Montreal. Speaks French. | 1 | daysAgo_4 | daysAgo_3 | daysAgo_4 |
| guest_rachel_h | prop_maison | +18435550923 | Rachel Henderson | ["anniversary trip", "fine dining"] | Celebrating 10th anniversary. | 1 | daysAgo_2 | daysAgo_2 | daysAgo_2 |
| guest_kenji_t | prop_haus | +4917655508341 | Kenji Tanaka | ["art galleries", "vegetarian"] | Visiting for art fair. Staying 5 nights. | 1 | daysAgo_6 | daysAgo_5 | daysAgo_6 |
| guest_clara_s | prop_haus | +4915255507562 | Clara Schulz | ["local nightlife", "brunch spots"] | Regular guest, lives in Hamburg. | 2 | daysAgo_45 | daysAgo_3 | daysAgo_45 |

## Conversations

| id | propertyId | guestId | status | category | assignedToUserId | lastMessageAt | lastMessagePreview | messageCount | aiHandled | unreadByStaff | createdAt | resolvedAt |
|----|------------|---------|--------|----------|------------------|---------------|-------------------|-------------|-----------|---------------|-----------|------------|
| conv_001 | prop_linden | guest_sarah_m | resolved | dining | user_maria | daysAgo_2 | Great news — I've booked a table for 2 at Trattoria... | 5 | false | false | daysAgo_3 | daysAgo_2 |
| conv_002 | prop_linden | guest_james_t | resolved | housekeeping | user_david | daysAgo_4 | I'm sorry about that, James. I've let our maintenance... | 3 | false | false | daysAgo_5 | daysAgo_4 |
| conv_003 | prop_linden | guest_anna_k | active | dining | user_maria | daysAgo_1 | Welcome back, Anna! So glad you're with us again... | 3 | false | false | daysAgo_1 | null |
| conv_004 | prop_linden | guest_mike_r | waiting | activities | null | daysAgo_1 | Thanks! Are any of those studios open early morning? | 3 | false | true | daysAgo_1 | null |
| conv_005 | prop_linden | guest_lisa_w | resolved | transport | null | daysAgo_7 | Your taxi is confirmed for 6:45am tomorrow morning. | 4 | true | false | daysAgo_7 | daysAgo_7 |
| conv_006 | prop_maison | guest_pierre_d | active | information | user_sarah_m | daysAgo_3 | The Battery and White Point Garden are both walkable... | 3 | false | false | daysAgo_4 | null |
| conv_007 | prop_maison | guest_rachel_h | waiting | dining | user_sarah_m | daysAgo_2 | That sounds wonderful! Could you book for 7:30pm? | 2 | false | true | daysAgo_2 | null |
| conv_008 | prop_haus | guest_kenji_t | resolved | activities | user_tom | daysAgo_5 | Have a great time at the gallery! | 4 | false | false | daysAgo_6 | daysAgo_5 |

## Messages

| id | conversationId | propertyId | direction | sender | senderUserId | body | isInternalNote | deliveryStatus | createdAt |
|----|---------------|------------|-----------|--------|-------------|------|----------------|----------------|-----------|
| msg_001 | conv_001 | prop_linden | inbound | guest | null | Hi, can you recommend a good Italian restaurant nearby? | false | delivered | daysAgo_3 |
| msg_002 | conv_001 | prop_linden | outbound | ai | null | I'd recommend Trattoria Sorrento — it's a 5-minute walk from the hotel. They do handmade pasta and have a lovely courtyard for dinner. Would you like me to check if they have availability tonight? | false | delivered | daysAgo_3 |
| msg_003 | conv_001 | prop_linden | inbound | guest | null | Yes please, for 2 at 8pm | false | delivered | daysAgo_3 |
| msg_004 | conv_001 | prop_linden | outbound | ai | null | I'll check on that for you. One moment. | false | delivered | daysAgo_3 |
| msg_005 | conv_001 | prop_linden | outbound | staff | user_maria | Great news — I've booked a table for 2 at Trattoria Sorrento tonight at 8pm under your name. When you arrive, mention you're staying with us and they'll take great care of you. Enjoy! | false | delivered | daysAgo_2 |
| msg_006 | conv_002 | prop_linden | inbound | guest | null | The air conditioning in room 304 isn't working and it's really hot | false | delivered | daysAgo_5 |
| msg_007 | conv_002 | prop_linden | outbound | system | null | [AI categorised as housekeeping — flagged for staff, confidence low] | true | null | daysAgo_5 |
| msg_008 | conv_002 | prop_linden | outbound | staff | user_david | I'm sorry about that, James. I've let our maintenance team know and they're heading to your room now. In the meantime, I've arranged for a portable fan to be brought up. If you'd prefer, I can also check if we have another room available for you. | false | delivered | daysAgo_4 |
| msg_009 | conv_003 | prop_linden | outbound | system | null | [Returning guest. Preferences: high floor, no down pillows, likes French cuisine] | true | null | daysAgo_1 |
| msg_010 | conv_003 | prop_linden | inbound | guest | null | Just checked in, room is lovely as always. Any new restaurant recommendations since my last visit? | false | delivered | daysAgo_1 |
| msg_011 | conv_003 | prop_linden | outbound | staff | user_maria | Welcome back, Anna! So glad you're with us again. Since your last visit, a wonderful French bistro called Le Petit opened just around the corner — I think you'd love it. They have a fantastic bouillabaisse. Shall I book a table? | false | delivered | daysAgo_1 |
| msg_012 | conv_004 | prop_linden | inbound | guest | null | Hey, are there any good yoga studios near the hotel? | false | delivered | daysAgo_1 |
| msg_013 | conv_004 | prop_linden | outbound | ai | null | There are a couple of great options! Practice Yoga is a 10-minute walk on South 1st — they have vinyasa and restorative classes. Black Swan Yoga is also nearby and does donation-based classes. Want me to check today's schedule for either? | false | delivered | daysAgo_1 |
| msg_014 | conv_004 | prop_linden | inbound | guest | null | Thanks! Are any of those studios open early morning? | false | delivered | daysAgo_1 |
| msg_015 | conv_005 | prop_linden | inbound | guest | null | Hi, I need a taxi to the airport tomorrow morning. Flight is at 9am. | false | delivered | daysAgo_7 |
| msg_016 | conv_005 | prop_linden | outbound | ai | null | I'd recommend being picked up around 6:45am to allow plenty of time. Shall I arrange a taxi for that time? | false | delivered | daysAgo_7 |
| msg_017 | conv_005 | prop_linden | inbound | guest | null | Yes, 6:45 works. Thanks! | false | delivered | daysAgo_7 |
| msg_018 | conv_005 | prop_linden | outbound | ai | null | Your taxi is confirmed for 6:45am tomorrow morning. The driver will wait in front of the hotel. Have a safe flight, Lisa! | false | delivered | daysAgo_7 |
| msg_019 | conv_006 | prop_maison | inbound | guest | null | Bonjour! What historical sites do you recommend that are walking distance? | false | delivered | daysAgo_4 |
| msg_020 | conv_006 | prop_maison | outbound | ai | null | Great question! Charleston has wonderful history within walking distance. Let me get our team to share their personal favourites with you. | false | delivered | daysAgo_4 |
| msg_021 | conv_006 | prop_maison | outbound | staff | user_sarah_m | The Battery and White Point Garden are both walkable from here — about 15 minutes — and absolutely worth the stroll. The Old Slave Mart Museum on Chalmers Street is also very close and deeply moving. I'd also suggest Rainbow Row on East Bay for a beautiful walk. Would you like a printed walking map? | false | delivered | daysAgo_3 |
| msg_022 | conv_007 | prop_maison | inbound | guest | null | We're celebrating our anniversary tonight — any special dinner recommendations? | false | delivered | daysAgo_2 |
| msg_023 | conv_007 | prop_maison | outbound | ai | null | Happy anniversary! For a truly special evening, I'd suggest FIG on Meeting Street — it's one of Charleston's finest and perfect for celebrations. They have a stunning tasting menu. Shall I try to book a table? | false | delivered | daysAgo_2 |
| msg_024 | conv_007 | prop_maison | inbound | guest | null | That sounds wonderful! Could you book for 7:30pm? | false | delivered | daysAgo_2 |
| msg_025 | conv_008 | prop_haus | inbound | guest | null | Hi! I'm here for the art fair. Which galleries should I visit in the neighbourhood? | false | delivered | daysAgo_6 |
| msg_026 | conv_008 | prop_haus | outbound | ai | null | Welcome! You're in a great area for art. KW Institute is a must — just a 5-minute walk. Eigen + Art on Auguststrasse is another favourite. Let me get our team to share more hidden gems. | false | delivered | daysAgo_6 |
| msg_027 | conv_008 | prop_haus | outbound | staff | user_tom | Also check out Galerie Guido Baudach on Oudenarder Strasse — they always have interesting contemporary shows. For something more experimental, try NOME Gallery in Kreuzberg. If you want a break from galleries, Bonanza Coffee on Oderberger is the best coffee in the area. | false | delivered | daysAgo_5 |
| msg_028 | conv_008 | prop_haus | inbound | guest | null | Amazing, thank you so much! | false | delivered | daysAgo_5 |
| msg_029 | conv_008 | prop_haus | outbound | staff | user_tom | Have a great time at the gallery! | false | delivered | daysAgo_5 |

## Knowledge Entries

| id | propertyId | title | category | description | url | hours | createdAt |
|----|------------|-------|----------|-------------|-----|-------|-----------|
| ke_001 | prop_linden | Trattoria Sorrento | dining | Authentic Italian, 5-minute walk from hotel. Handmade pasta, lovely courtyard. Reservations recommended on weekends. $$$. | https://maps.google.com/trattoria-sorrento | Tue-Sun 5pm-10pm | daysAgo_160 |
| ke_002 | prop_linden | Le Petit French Bistro | dining | New French bistro around the corner. Excellent bouillabaisse and wine selection. Intimate setting, 30 seats. $$$$. | https://maps.google.com/le-petit-austin | Wed-Mon 5:30pm-11pm | daysAgo_30 |
| ke_003 | prop_linden | Uchi | dining | Award-winning Japanese farmhouse dining. 10 minutes by car. Omakase and a la carte. Book well in advance. $$$$. | https://maps.google.com/uchi-austin | Daily 5pm-10pm | daysAgo_160 |
| ke_004 | prop_linden | Practice Yoga Austin | activities | Vinyasa and restorative yoga studio, 10-minute walk on South 1st. Drop-ins welcome. Mats provided. | https://maps.google.com/practice-yoga | Mon-Sat 6am-8pm, Sun 8am-6pm | daysAgo_160 |
| ke_005 | prop_linden | Black Swan Yoga | activities | Donation-based yoga studio, 15-minute walk. Heated and unheated classes. Cash or Venmo for donations. | https://maps.google.com/black-swan-yoga | Daily 6am-9pm | daysAgo_160 |
| ke_006 | prop_linden | Airport Transfer | transport | Taxi to Austin-Bergstrom International (AUS). Allow 25-35 minutes depending on traffic. $35-45 one way. Hotel can arrange pickup. | null | 24/7 — book 12 hours ahead | daysAgo_160 |
| ke_007 | prop_linden | Lady Bird Lake Trail | activities | Scenic walking and running trail along the Colorado River. Accessible from Congress Ave Bridge, 10-minute walk. Kayak and paddleboard rentals available at the trailhead. | https://maps.google.com/lady-bird-lake | Dawn to dusk | daysAgo_160 |
| ke_008 | prop_linden | South Congress Shopping | shopping | Walkable stretch of boutiques, vintage shops, and galleries along South Congress Ave. Start at the hotel and walk south. Highlights: Uncommon Objects, Allen's Boots, Parts & Labour. | null | Most shops 10am-7pm daily | daysAgo_160 |
| ke_009 | prop_linden | WiFi & Parking | hotel-faq | WiFi network: TheLinden_Guest, password: welcomehome2026. Valet parking $35/night, self-park lot one block east is $15/day. | null | null | daysAgo_160 |
| ke_010 | prop_linden | Room Service | services | Available 6am-11pm daily. Light menu after 10pm. Dial ext. 0 or text this number. Breakfast delivery needs 30-min lead time. | null | 6am-11pm | daysAgo_160 |

## Quick Actions

| id | propertyId | title | templateBody | isDefault | isHidden | sortOrder | createdAt |
|----|------------|-------|-------------|-----------|----------|-----------|-----------|
| qa_001 | prop_linden | Restaurant Rec | I'd recommend {restaurant}. It's about {distance} from the hotel. Would you like me to check availability? | true | false | 1 | daysAgo_180 |
| qa_002 | prop_linden | Directions | The hotel is located at 1401 S Congress Ave. The easiest way to get here is {directions}. Let me know if you need anything else! | true | false | 2 | daysAgo_180 |
| qa_003 | prop_linden | Checkout Time | Checkout is at 11:00am. Would you like to arrange a late checkout? I'm happy to check availability. | true | false | 3 | daysAgo_180 |
| qa_004 | prop_linden | WiFi Info | Our WiFi network is TheLinden_Guest. The password is welcomehome2026. Let me know if you have any trouble connecting. | true | false | 4 | daysAgo_180 |
| qa_005 | prop_linden | Taxi | I'll arrange a taxi for you. What time would you like to be picked up, and where are you heading? | true | false | 5 | daysAgo_180 |

## Routing Rules

| id | propertyId | category | assignToUserId | createdAt |
|----|------------|----------|----------------|-----------|
| rr_001 | prop_linden | dining | user_maria | daysAgo_170 |
| rr_002 | prop_linden | housekeeping | user_david | daysAgo_170 |
| rr_003 | prop_linden | complaint | user_maria | daysAgo_170 |
| rr_004 | prop_linden | transport | user_david | daysAgo_170 |

## AI Voice Config

| id | propertyId | brandVoiceDescription | wordsToUse | wordsToAvoid | examplePairs | createdAt |
|----|------------|-----------------------|------------|--------------|-------------|-----------|
| vc_001 | prop_linden | The Linden speaks with warmth and local pride. We're knowledgeable but never stuffy — like a well-travelled friend who happens to know every great spot in Austin. We use the guest's name when we know it and always offer to help further. | ["lovely", "happy to help", "I'd recommend", "wonderful", "enjoy"] | ["no problem", "per your request", "as per", "unfortunately", "I'm afraid"] | [{"question": "Where should I eat tonight?", "idealResponse": "I'd love to help with that! What are you in the mood for? We have some wonderful options within walking distance."}] | daysAgo_170 |

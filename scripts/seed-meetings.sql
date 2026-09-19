CREATE TABLE IF NOT EXISTS meetings (
  id             SERIAL        PRIMARY KEY,
  date           DATE          NOT NULL UNIQUE,
  meeting_type   VARCHAR(20)   NOT NULL
                               CHECK (meeting_type IN
                                 ('testimony','regular','stake','general','special')),
  presiding      VARCHAR(255)  NOT NULL,
  conducting     VARCHAR(255)  NOT NULL,
  announcements  TEXT[]        DEFAULT '{}',
  opening_hymn   JSONB         NOT NULL,
  opening_prayer VARCHAR(255)  NOT NULL,
  ward_business  JSONB         DEFAULT '[]',
  stake_business BOOLEAN       DEFAULT false,
  sacrament_hymn JSONB         NOT NULL,
  speakers       JSONB         DEFAULT '[]',
  closing_hymn   JSONB         NOT NULL,
  closing_prayer VARCHAR(255)  NOT NULL
);

TRUNCATE meetings RESTART IDENTITY;

INSERT INTO meetings (
  id, date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES
(
  1, '2026-09-13', 'regular', 'Bishop Akpoviwhroro', 'Brother Enoh',
  ARRAY['Youth conference volunteers needed by Friday', 'Temple recommend interviews on Saturday'],
  '{"number": 2, "title": "The Spirit of God"}'::jsonb,
  'Sister Aniebiet',
  '[{"description": "Sustaining of new Relief Society president"}, {"description": "Thanksgiving dinner service schedule announced"}]'::jsonb,
  false,
  '{"number": 170, "title": "God, Our Father, Hear Us Pray"}'::jsonb,
  '[{"name": "Brother Chibuzor", "topic": "The Blessings of Covenant Living", "type": "speaker"}, {"name": "Ward Choir", "topic": "", "type": "musical-number"}, {"name": "Brother Harrison", "topic": "Keeping Faith Through Change", "type": "speaker"}]'::jsonb,
  '{"number": 31, "title": "O God, Our Help in Ages Past"}'::jsonb,
  'Brother Thompson'
),
(
  2, '2026-09-06', 'testimony', 'President Lewis', 'Brother Hughes',
  ARRAY[]::text[],
  '{"number": 144, "title": "Faith of Our Fathers"}'::jsonb,
  'Brother Foster',
  '[{"description": "Fast offering donations and family history class signups"}]'::jsonb,
  true,
  '{"number": 191, "title": "I Stand All Amazed"}'::jsonb,
  '[{"name": "Sister Clark", "topic": "Simple Acts of Service", "type": "speaker"}, {"name": "Brother Ramirez", "topic": "Testimony of the Savior", "type": "speaker"}]'::jsonb,
  '{"number": 116, "title": "Come, Come, Ye Saints"}'::jsonb,
  'Sister Price'
),
(
  3, '2026-08-30', 'regular', 'Bishop Akpoviwhroro', 'Brother Watson',
  ARRAY['Ward mission leader updates', 'Primary activity on Saturday'],
  '{"number": 109, "title": "How Great Thou Art"}'::jsonb,
  'Brother Garcia',
  '[{"description": "Ward budget review and service committee assignments"}, {"description": "New nursery schedule shared"}]'::jsonb,
  false,
  '{"number": 173, "title": "Where Can I Turn for Peace?"}'::jsonb,
  '[{"name": "Sister Kim", "topic": "Finding Peace in Christ", "type": "speaker"}, {"name": "Youth Quartet", "topic": "", "type": "musical-number"}]'::jsonb,
  '{"number": 85, "title": "Be Still, My Soul"}'::jsonb,
  'Brother Patel'
),
(
  4, '2026-08-23', 'stake', 'Stake President Hill', 'Brother Ross',
  ARRAY[]::text[],
  '{"number": 152, "title": "We Thank Thee, O God, for a Prophet"}'::jsonb,
  'Sister Reed',
  '[{"description": "Stake temple district announcement and leadership training"}]'::jsonb,
  true,
  '{"number": 161, "title": "I Know That My Redeemer Lives"}'::jsonb,
  '[{"name": "Brother Jenkins", "topic": "Living the Gospel Daily", "type": "speaker"}, {"name": "Stake Choir", "topic": "", "type": "musical-number"}, {"name": "Sister Moore", "topic": "The Joy of Ministering", "type": "speaker"}]'::jsonb,
  '{"number": 67, "title": "Master, the Tempest Is Raging"}'::jsonb,
  'Brother Diaz'
),
(
  5, '2026-08-16', 'general', 'Elder Sanders', 'Brother Walker',
  ARRAY['General conference watch party schedule', 'Missionary opportunities in the neighborhood'],
  '{"number": 58, "title": "Guide Us, O Thou Great Jehovah"}'::jsonb,
  'Sister Hurst',
  '[{"description": "Welcome to new families in the ward"}, {"description": "Youth temple trip signups open"}]'::jsonb,
  false,
  '{"number": 140, "title": "I Need Thee Every Hour"}'::jsonb,
  '[{"name": "Brother Coleman", "topic": "Trusting the Lord in Our Trials", "type": "speaker"}, {"name": "Sister Ortiz", "topic": "The Power of Prayer", "type": "speaker"}]'::jsonb,
  '{"number": 120, "title": "Praise to the Man"}'::jsonb,
  'Brother Morris'
),
(
  6, '2026-08-09', 'special', 'Bishop Akpoviwhroro', 'Brother Smith',
  ARRAY['Special sacrament meeting for returning missionaries'],
  '{"number": 7, "title": "Israel, Israel, God Is Calling"}'::jsonb,
  'Sister Bennett',
  '[{"description": "Welcome home for Elder Okonkwo"}]'::jsonb,
  false,
  '{"number": 193, "title": "I Stand All Amazed"}'::jsonb,
  '[{"name": "Elder Okonkwo", "topic": "The Harvest of Missionary Work", "type": "speaker"}, {"name": "Sister Smith", "topic": "Inviting Others to Come unto Christ", "type": "speaker"}]'::jsonb,
  '{"number": 21, "title": "Come, Listen to a Prophet Voice"}'::jsonb,
  'Brother Adeyemi'
),
(
  7, '2026-08-02', 'testimony', 'President Lewis', 'Sister Hughes',
  ARRAY['Fast Sunday: please bring a written testimony to share with family']::text[],
  '{"number": 136, "title": "I Know That My Redeemer Lives"}'::jsonb,
  'Brother Chen',
  '[{"description": "Relief Society compassionate service assignments"}]'::jsonb,
  false,
  '{"number": 194, "title": "There Is a Green Hill Far Away"}'::jsonb,
  '[{"name": "Brother Smith", "topic": "Bearing Testimony in Daily Life", "type": "speaker"}]'::jsonb,
  '{"number": 98, "title": "I Need Thee Every Hour"}'::jsonb,
  'Sister Okoro'
),
(
  8, '2026-07-26', 'regular', 'Bishop Akpoviwhroro', 'Brother Enoh',
  ARRAY['Youth temple trip deposit due Friday'],
  '{"number": 89, "title": "The Lord Is My Shepherd"}'::jsonb,
  'Sister Nwosu',
  '[{"description": "Callings to be sustained next week"}]'::jsonb,
  false,
  '{"number": 169, "title": "As Now We Take the Sacrament"}'::jsonb,
  '[{"name": "Sister Adeyemi", "topic": "Keeping the Sabbath Day Holy", "type": "speaker"}, {"name": "Primary Choir", "topic": "", "type": "musical-number"}, {"name": "Brother Okonkwo", "topic": "The Gift of the Holy Ghost", "type": "speaker"}]'::jsonb,
  '{"number": 19, "title": "We Thank Thee, O God, for a Prophet"}'::jsonb,
  'Brother Johnson'
),
(
  9, '2026-07-19', 'stake', 'Stake President Hill', 'Brother Ross',
  ARRAY[]::text[],
  '{"number": 249, "title": "Called to Serve"}'::jsonb,
  'Sister Diaz',
  '[{"description": "Stake choir rehearsal after the block"}]'::jsonb,
  true,
  '{"number": 172, "title": "In Humility, Our Savior"}'::jsonb,
  '[{"name": "Sister Smith", "topic": "Ministering as the Savior Did", "type": "speaker"}, {"name": "Brother Hill", "topic": "Covenants That Bind Us to Christ", "type": "speaker"}]'::jsonb,
  '{"number": 81, "title": "Press Forward, Saints"}'::jsonb,
  'Brother Walker'
),
(
  10, '2026-03-01', 'regular', 'Bishop Smith', 'Brother Patel',
  ARRAY['Ward conference next month', 'Temple recommend renewal interviews'],
  '{"number": 5, "title": "High on the Mountain Top"}'::jsonb,
  'Sister Price',
  '[{"description": "New ministering assignments distributed"}]'::jsonb,
  false,
  '{"number": 181, "title": "Jesus of Nazareth, Savior and King"}'::jsonb,
  '[{"name": "Brother Garcia", "topic": "The Restoration Continues", "type": "speaker"}, {"name": "Sister Kim", "topic": "Scripture Study That Changes Us", "type": "speaker"}]'::jsonb,
  '{"number": 27, "title": "Praise to the Man"}'::jsonb,
  'Brother Foster'
);

SELECT setval(pg_get_serial_sequence('meetings', 'id'), (SELECT MAX(id) FROM meetings));

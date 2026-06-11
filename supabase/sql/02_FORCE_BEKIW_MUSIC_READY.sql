-- TULUS BekiW music force-fix
-- Aman dijalankan ulang. Ini memastikan /bekiw tidak menampilkan no music selected.
update public.profiles
set
  show_music = true,
  music_source_type = 'external_platform',
  music_title = 'Quiet Link',
  music_artist = 'YouTube',
  music_url = coalesce(nullif(music_url, ''), 'https://www.youtube.com/'),
  music_external_url = coalesce(nullif(music_external_url, ''), 'https://www.youtube.com/'),
  music_direct_url = null,
  music_upload_url = null,
  music_fallback_text = 'Open on YouTube',
  updated_at = now()
where username = 'bekiw'
returning username, show_music, music_source_type, music_title, music_artist, music_url, music_external_url;

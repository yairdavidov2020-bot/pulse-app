import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eptvlnqekogdakvyloeg.supabase.co'
const supabaseKey = 'sb_publishable_Z5vHRP5UVmChVqGZ_1psRg_5DSYye5J'

export const supabase = createClient(supabaseUrl, supabaseKey)
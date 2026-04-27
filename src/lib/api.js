import { supabase } from './supabase'

// ---- AUTH ----
export const signUp = (email, password) =>
  supabase.auth.signUp({ email, password })

export const signIn = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signOut = () =>
  supabase.auth.signOut()

export const getUser = () =>
  supabase.auth.getUser()

// ---- CUERPOS CELESTES ----
export const getAllBodies = () =>
  supabase.from('celestial_bodies').select('*')

export const getBodyById = (id) =>
  supabase.from('celestial_bodies').select('*').eq('id', id).single()

export const getBodiesByCategory = (category) =>
  supabase.from('celestial_bodies').select('*').eq('category', category)

// ---- FAVORITOS ----
export const addFavorite = (userId, celestialBodyId) =>
  supabase.from('favorites').insert({ user_id: userId, celestial_body_id: celestialBodyId })

export const removeFavorite = (userId, celestialBodyId) =>
  supabase.from('favorites').delete()
    .eq('user_id', userId)
    .eq('celestial_body_id', celestialBodyId)

export const getUserFavorites = (userId) =>
  supabase.from('favorites')
    .select('*, celestial_bodies(*)')
    .eq('user_id', userId)

// ---- COMENTARIOS ----
export const getComments = (celestialBodyId) =>
  supabase.from('comments')
    .select('*, profiles(username, avatar_url)')
    .eq('celestial_body_id', celestialBodyId)
    .order('created_at', { ascending: false })

export const addComment = (userId, celestialBodyId, content) =>
  supabase.from('comments').insert({
    user_id: userId,
    celestial_body_id: celestialBodyId,
    content
  })

export const deleteComment = (commentId) =>
  supabase.from('comments').delete().eq('id', commentId)

// ---- PERFIL ----
export const getProfile = (userId) =>
  supabase.from('profiles').select('*').eq('id', userId).single()

export const createProfile = (userId, username) =>
  supabase.from('profiles').insert({ id: userId, username })

export const updateProfile = (userId, updates) =>
  supabase.from('profiles').update(updates).eq('id', userId)

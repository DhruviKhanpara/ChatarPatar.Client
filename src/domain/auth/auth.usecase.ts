/**
 * Auth use case hooks — service layer.
 *
 * Pattern:
 *  - useHydrateX → fetch + store data
 *  - usePersistX → create/update/delete operations
 *
 * Uses RTK Query hooks for API calls, mappers for transformation,
 * and dispatches results to Redux.
 */

import { useCallback } from 'react';
import { useAppDispatch } from '@/app/store';
import { setUser, clearAuth } from '@/features/authSlice';
import { useLoginMutation, useRegisterMutation, useLogoutMutation, useLazyGetMyDetailsQuery, useLazyGetMyProfileQuery } from '@/api/authApi';
import { mapUserDtoToUser } from './auth.mapper';
import type { LoginRequest, RegisterRequest } from '@/types/auth';

/**
 * Hydrate current user profile into Redux.
 */
export const useHydrateUser = () => {
  const [fetchProfile, { isLoading }] = useLazyGetMyProfileQuery();
  const dispatch = useAppDispatch();

  const hydrateUser = useCallback(async () => {
    const profile = await fetchProfile().unwrap();
    const user = mapUserDtoToUser({
      id: profile.id,
      name: profile.name,
      avatarUrl: profile.avatarUrl ?? '',
      email: profile.email ?? '',
    });
    dispatch(setUser(user));
    return user;
  }, [fetchProfile, dispatch]);

  return { hydrateUser, isLoading };
};

/**
 * Login use case — authenticate and store user in Redux.
 */
export const usePersistLogin = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [fetchUserDetails] = useLazyGetMyDetailsQuery();
  const dispatch = useAppDispatch();

  const login = useCallback(async (credentials: LoginRequest) => {
    await loginMutation(credentials);
    const response = await fetchUserDetails().unwrap();
    
    const user = mapUserDtoToUser(response);
    dispatch(setUser(user));

    return user;
  }, [loginMutation, dispatch]);

  return { login, isLoading };
};

/**
 * Register use case — create account and store user in Redux.
 */
export const usePersistRegister = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const register = useCallback(async (data: RegisterRequest) => {
    const response = await registerMutation(data).unwrap();
    const user = mapUserDtoToUser(response.user);
    dispatch(setUser(user));
    return user;
  }, [registerMutation, dispatch]);

  return { register, isLoading };
};

/**
 * Logout use case — clear auth state.
 */
export const usePersistLogout = () => {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // Even if server call fails, clear local state
    }
    dispatch(clearAuth());
  }, [logoutMutation, dispatch]);

  return { logout };
};

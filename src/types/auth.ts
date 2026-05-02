/**
 * Auth types — DTOs, request types, view models.
 */

// ── DTOs (match backend response shapes exactly) ───────────────────────

export interface UserDto {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface UserProfileDto {
  username?: string;
  email?: string;
  isEmailVerified?: boolean;
  createdAt?: string;
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
  avatarThumbnailUrl: string | null;
}

export interface LoginResponseDto {
  user: UserDto;
}

export interface RegisterResponseDto {
  user: UserDto;
  org?: {
    id: string;
    name: string;
    slug: string;
  };
}

// ── Request types ──────────────────────────────────────────────────────

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

// ── View Models (used by UI components) ────────────────────────────────

export interface UserViewModel {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: { url: string | null; publicId: string | null };
  bio: string | null;
  isEmailVerified: boolean;
  initials: string;
}

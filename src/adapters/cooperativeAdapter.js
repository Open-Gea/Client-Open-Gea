export default function cooperativeAdapter({ id, name, country, email, created_at, extras, token, acceptedTermsConditions , description, profile_picture, status  }) {
  return {
    id,
    name: name,
    country,
    email,
    createdAt: created_at,
    extras,
    acceptedTermsConditions,
    token,
    profilePicture: profile_picture,
    description,
    status,
  };
}
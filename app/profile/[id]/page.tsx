import UserProfile from '@/app/components/profile';

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  return (
    <div className=" h-screen w-screen">
      <UserProfile id={id} />
    </div>
  );
}

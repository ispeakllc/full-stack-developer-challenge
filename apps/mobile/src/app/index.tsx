import React, { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import { LegendList } from '@legendapp/list';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { RouterOutputs } from '@/utils/api';
import { trpc } from '@/utils/api';
import { authClient } from '@/utils/auth';

function PostCard(props: {
  post: RouterOutputs['post']['search']['items'][number];
  onDelete: () => void;
}) {
  return (
    <View className="bg-muted flex flex-row rounded-lg p-4">
      <View className="flex-grow">
        <Link
          asChild
          href={{
            pathname: '/post/[id]',
            params: { id: props.post.id },
          }}
        >
          <Pressable className="">
            <Text className="text-primary text-xl font-semibold">
              {props.post.title}
            </Text>
            <Text className="text-foreground mt-2">{props.post.content}</Text>
          </Pressable>
        </Link>
      </View>
      <Pressable onPress={props.onDelete}>
        <Text className="text-primary font-bold uppercase">Delete</Text>
      </Pressable>
    </View>
  );
}

function CreatePost() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { mutate, error } = useMutation(
    trpc.post.create.mutationOptions({
      async onSuccess() {
        setTitle('');
        setContent('');
        await queryClient.invalidateQueries(trpc.post.search.queryFilter());
      },
    }),
  );

  return (
    <View className="mt-4 flex gap-2">
      <TextInput
        className="border-input bg-background text-foreground items-center rounded-md border px-3 text-lg leading-[1.25]"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="text-destructive mb-2">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="border-input bg-background text-foreground items-center rounded-md border px-3 text-lg leading-[1.25]"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="text-destructive mb-2">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <Pressable
        className="bg-primary flex items-center rounded p-2"
        onPress={() => {
          mutate({
            title,
            content,
          });
        }}
      >
        <Text className="text-foreground">Create</Text>
      </Pressable>
      {error?.data?.code === 'UNAUTHORIZED' && (
        <Text className="text-destructive mt-2">
          You need to be logged in to create a post
        </Text>
      )}
    </View>
  );
}

function MobileAuth() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <Text className="pb-2 text-center text-xl font-semibold text-zinc-900">
        {session?.user.name ? `Hello, ${session.user.name}` : 'Not logged in'}
      </Text>
      <Button
        onPress={() =>
          session
            ? authClient.signOut()
            : authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
              })
        }
        title={session ? 'Sign Out' : 'Sign In With Google'}
        color={'#5B65E9'}
      />
    </>
  );
}

export default function Index() {
  const queryClient = useQueryClient();

  const postQuery = useQuery(trpc.post.search.queryOptions({}));

  const deletePostMutation = useMutation(
    trpc.post.delete.mutationOptions({
      onSettled: () =>
        queryClient.invalidateQueries(trpc.post.search.queryFilter()),
    }),
  );

  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: 'Home Page' }} />
      <View className="bg-background h-full w-full p-4">
        <Text className="text-foreground pb-2 text-center text-5xl font-bold">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <MobileAuth />

        <View className="py-2">
          <Text className="text-primary font-semibold italic">
            Press on a post
          </Text>
        </View>

        <LegendList
          data={postQuery.data?.items ?? []}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() =>
                deletePostMutation.mutate({
                  id: p.item.id,
                })
              }
            />
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
}

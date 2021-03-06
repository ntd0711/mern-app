import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { ButtonCustom, InputField } from 'components';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import EditorPost from './post-editor';

function PostForm({ onSubmit, post, loading }) {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required()
      .test('check title', 'title at least two word', (value) => {
        return value.split(' ').filter((x) => x.length >= 2).length >= 2;
      }),
    content: yup.string().required(),
    description: yup
      .string()
      .required()
      .test('check description', 'description at least two word', (value) => {
        return value.split(' ').filter((x) => x.length >= 2).length >= 2;
      }),
    tags: yup.string().required(),
  });

  const { handleSubmit, control, setValue, reset, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      description: post?.description || '',
      tags: post?.tags?.join(' ') || '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
      // reset();
    }
  };

  const handleChangeContent = (value) => {
    setValue('content', value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <InputField
        name="title"
        placeholder="Title of post..."
        value={getValues('title')}
        setValue={setValue}
        control={control}
        bgcolor="common.dark"
        fontSize="36px"
      />
      <EditorPost onChange={handleChangeContent} value={getValues('content')} />
      <InputField
        name="description"
        placeholder="Description"
        value={getValues('title')}
        setValue={setValue}
        fullWidth
        control={control}
      />
      <InputField
        name="tags"
        placeholder="Tags"
        value={getValues('tags')}
        setValue={setValue}
        fullWidth
        control={control}
      />
      <Stack direction="row" spacing={1.4}>
        <Button onClick={() => reset()} variant="contained" color="secondary">
          Clear
        </Button>
        <ButtonCustom disabled={loading} parentIconWidth="16px" iconSize="1.1rem" spacing="0.2rem">
          {post ? 'Update' : 'Create'}
        </ButtonCustom>
      </Stack>
    </Box>
  );
}

export default PostForm;

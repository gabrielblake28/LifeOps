import { useEffect, useState } from 'react';
import { Grid, Stack, Typography, SelectChangeEvent, Button } from '@mui/material';
import { CustomInput } from 'components/CustomInput';
import { useEpicStore } from 'zustand-store/EpicStore';
import { Epic, EpicStatus } from '../../Types/Epic';

type CreateEpicProps = {
  handleToggle: () => void;
  epic?: Epic;
};

export const CreateEpic = ({ handleToggle, epic }: CreateEpicProps) => {
  const [epicName, setEpicName] = useState(epic ? epic.title : '');
  const [isEpicValid, setIsEpicValid] = useState(true);
  const { AddEpic, DeleteEpic, UpdateEpic } = useEpicStore();

  const handleEpicClick = async () => {
    !epic ? AddEpic({ title: epicName, status: EpicStatus.IN_PROGRESS, user_id: '1' }) : UpdateEpic({ ...epic, title: epicName });

    handleToggle();
  };

  useEffect(() => {
    if (epicName) {
      setIsEpicValid(false);
    } else {
      setIsEpicValid(true);
    }
  }, [epicName]);

  const handleEpicNameChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    setEpicName(event.target.value as string);
  };

  return (
    <Grid container spacing={3} padding={3} paddingTop={0}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: -1 } }}>
          <Typography variant="h3">{`${epic ? 'Edit' : 'Create'} an epic`}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <>
          <CustomInput placeholder="Enter epic title" value={epicName} handleChange={handleEpicNameChange} />
        </>

        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          disabled={isEpicValid}
          onClick={handleEpicClick}
          sx={{ mt: 3 }}
        >
          {`${epic ? 'Update' : 'Create'} epic`}
        </Button>
        {epic ? (
          <Button
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="error"
            disabled={isEpicValid}
            onClick={() => {
              DeleteEpic(epic.id ?? '');
              handleToggle();
            }}
            sx={{ mt: 3 }}
          >
            {'Delete Epic'}
          </Button>
        ) : (
          <> </>
        )}
      </Grid>
    </Grid>
  );
};

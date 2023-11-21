import { getChannelAPI } from '@/apis/article';
import { useEffect, useState } from 'react';

interface Channel {
  id: number;
  name: string;
}

export function useChannel() {
  const [channelList, setChannelList] = useState<Channel[]>([]);

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();

      setChannelList(res.data.channels);
    };

    getChannelList();
  }, []);

  return {
    channelList
  };
}

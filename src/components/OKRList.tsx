import type { OKRType } from '../types/okr_types.tsx';
import { KeyResultList } from './KeyResult.tsx';

interface OkrListProps {
  okrs: OKRType[];
}

export const OkrList = ({ okrs }: OkrListProps) => {
  return (
    <div>
      {okrs.map((okr: OKRType, index: number) => (
        <div key={index}>
          <p>{okr.objective}</p>
          <KeyResultList keyResults={okr.keyResults} />
        </div>
      ))}
    </div>
  );
};

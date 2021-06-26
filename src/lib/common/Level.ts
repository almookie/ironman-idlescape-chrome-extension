import * as levelData from '../../data/levels.json';

export class Level {
    public static experienceToLevel(currentExperience: number): number {
        const totalExperience: number = levelData[currentExperience - 1].experience;
        return totalExperience - currentExperience;
    }
}
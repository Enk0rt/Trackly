import { IMeeting } from "../interfaces/meeting.interface";
import { Meeting } from "../models/meeting.model";

class MeetingRepository {
    public getAll(): Promise<IMeeting[]> {
        return Meeting.find();
    }

    public getById(id: string): Promise<IMeeting> {
        return Meeting.findById(id);
    }

    public create(createData: Partial<IMeeting>): Promise<IMeeting> {
        return Meeting.create(createData);
    }

    public update(
        id: string,
        updateData: Partial<IMeeting>,
    ): Promise<IMeeting> {
        return Meeting.findByIdAndUpdate(id, updateData);
    }

    public delete(id: string): Promise<void> {
        return Meeting.findByIdAndDelete(id);
    }
}

export const meetingRepository = new MeetingRepository();

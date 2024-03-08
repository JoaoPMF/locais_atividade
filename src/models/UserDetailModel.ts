class UserDetailModel {
    section: number;
    clusterId: number;
    clusterName: string;

    constructor(section: number, clusterId: number, clusterName: string) {
            this.section = section;
            this.clusterId = clusterId;
            this.clusterName = clusterName;
        }
}

export default UserDetailModel;
using UnityEngine;
using UnityEngine.UI;

public static class UIRoundCornerUtils
{
    /// <summary>
    /// 为UGUI组件添加圆角效果
    /// </summary>
    /// <param name="graphic">目标UI组件</param>
    /// <param name="radius">圆角半径</param>
    /// <param name="segments">圆角分段数</param>
    public static void SetRoundCorners(this Graphic graphic, float radius, int segments)
    {
        SetRoundCorners(graphic, new Vector4(radius, radius, radius, radius), segments);
    }

    /// <summary>
    /// 为UGUI组件添加圆角效果，可分别设置四个角的半径
    /// </summary>
    /// <param name="graphic">目标UI组件</param>
    /// <param name="radius">四个角的半径(左上,右上,右下,左下)</param>
    /// <param name="segments">圆角分段数</param>
    public static void SetRoundCorners(this Graphic graphic, Vector4 radius, int segments)
    {
        if (graphic == null) return;

        var rect = graphic.rectTransform.rect;
        var width = rect.width;
        var height = rect.height;

        // 确保至少有一个分段
        segments = Mathf.Max(1, segments);

        // 限制圆角半径不超过宽高的一半
        radius.x = Mathf.Min(radius.x, width / 2, height / 2);
        radius.y = Mathf.Min(radius.y, width / 2, height / 2);
        radius.z = Mathf.Min(radius.z, width / 2, height / 2);
        radius.w = Mathf.Min(radius.w, width / 2, height / 2);

        // 创建网格
        var mesh = new Mesh();
        
        // 计算顶点数量：中心点 + 每个角的分段点 + 4个矩形顶点
        int vertexCount = 1 + (segments + 1) * 4 + 4;
        var vertices = new Vector3[vertexCount];
        // 三角形数量：圆角部分 + 矩形中间部分
        var triangles = new int[segments * 4 * 3 + 4 * 3];
        var uvs = new Vector2[vertexCount];

        // 中心点
        vertices[0] = Vector3.zero;
        uvs[0] = new Vector2(0.5f, 0.5f);

        int vert = 1;
        int tris = 0;

        // 添加矩形的四个顶点（用于连接圆角）
        // 左上角连接点
        vertices[vert] = new Vector3(-width / 2, height / 2 - radius.x, 0);
        uvs[vert] = new Vector2(0, (height / 2 - radius.x + height / 2) / height);
        int leftTopIndex = vert++;

        // 右上角连接点
        vertices[vert] = new Vector3(width / 2 - radius.y, height / 2, 0);
        uvs[vert] = new Vector2((width / 2 - radius.y + width / 2) / width, 1);
        int rightTopIndex = vert++;

        // 右下角连接点
        vertices[vert] = new Vector3(width / 2, -height / 2 + radius.z, 0);
        uvs[vert] = new Vector2(1, (-height / 2 + radius.z + height / 2) / height);
        int rightBottomIndex = vert++;

        // 左下角连接点
        vertices[vert] = new Vector3(-width / 2 + radius.w, -height / 2, 0);
        uvs[vert] = new Vector2((-width / 2 + radius.w + width / 2) / width, 0);
        int leftBottomIndex = vert++;

        // 修正角的顺序和角度
        // 左上角
        int leftTopStartIndex = vert;
        CreateCorner(-width / 2 + radius.x, height / 2 - radius.x, radius.x, segments, 90, 180, ref vert, ref tris);
        
        // 右上角
        int rightTopStartIndex = vert;
        CreateCorner(width / 2 - radius.y, height / 2 - radius.y, radius.y, segments, 0, 90, ref vert, ref tris);
        
        // 右下角
        int rightBottomStartIndex = vert;
        CreateCorner(width / 2 - radius.z, -height / 2 + radius.z, radius.z, segments, 270, 360, ref vert, ref tris);
        
        // 左下角
        int leftBottomStartIndex = vert;
        CreateCorner(-width / 2 + radius.w, -height / 2 + radius.w, radius.w, segments, 180, 270, ref vert, ref tris);

        // 添加矩形中间部分的三角面
        // 上部分
        triangles[tris++] = 0;
        triangles[tris++] = leftTopIndex;
        triangles[tris++] = rightTopIndex;

        // 右部分
        triangles[tris++] = 0;
        triangles[tris++] = rightTopIndex;
        triangles[tris++] = rightBottomIndex;

        // 下部分
        triangles[tris++] = 0;
        triangles[tris++] = rightBottomIndex;
        triangles[tris++] = leftBottomIndex;

        // 左部分
        triangles[tris++] = 0;
        triangles[tris++] = leftBottomIndex;
        triangles[tris++] = leftTopIndex;

        // 生成圆角顶点和三角形
        void CreateCorner(float centerX, float centerY, float cornerRadius, int cornerSegments, float startAngle, float endAngle, ref int vertIndex, ref int trisIndex)
        {
            float angleStep = (endAngle - startAngle) / cornerSegments;
            Vector2 center = new Vector2(centerX, centerY);

            for (int i = 0; i <= cornerSegments; i++)
            {
                float angle = (startAngle + angleStep * i) * Mathf.Deg2Rad;
                Vector2 point = center + new Vector2(Mathf.Cos(angle), Mathf.Sin(angle)) * cornerRadius;
                vertices[vertIndex] = new Vector3(point.x, point.y, 0);
                
                // 修正UV坐标计算
                uvs[vertIndex] = new Vector2(
                    (point.x + width / 2) / width, 
                    (point.y + height / 2) / height
                );

                if (i < cornerSegments)
                {
                    triangles[trisIndex++] = 0;  // 中心点
                    triangles[trisIndex++] = vertIndex;
                    triangles[trisIndex++] = vertIndex + 1;
                }
                vertIndex++;
            }
        }

        mesh.vertices = vertices;
        mesh.triangles = triangles;
        mesh.uv = uvs;
        
        // 确保网格有正确的边界
        mesh.RecalculateBounds();

        // 更新UI组件的mesh
        var canvasRenderer = graphic.canvasRenderer;
        canvasRenderer.SetMesh(mesh);
        graphic.SetMaterialDirty(); // 确保材质更新
    }
}